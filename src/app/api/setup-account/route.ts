import { NextResponse, NextRequest } from "next/server";
import { InvitationService } from "@/features/invitation/application/invitation.service";
import { AccountService } from "@/features/account/application/account.service";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const token = searchParams.get('token');

  try {
    const result = await InvitationService.verify(token || "");
    return NextResponse.json({ email: result.email, role: result.role, status: 'VALID' }, { status: 200 });
  } catch (error: any) {
    if (error.message === "ALREADY_ACCEPTED") {
      return NextResponse.json({ status: 'ALREADY_ACCEPTED' }, { status: 200 });
    }

    return NextResponse.json({ error: 'Not Found' }, { status: 404 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();
    const result = await AccountService.create(payload);
    return NextResponse.json(result, { status: 201 });
  } catch (error: any) {
    if (error.message === "ALREADY_ACCEPTED") {
      return NextResponse.json({ error: "Account already set up. Please log in." }, { status: 400 });
    }
    if (error.message === "EMAIL_EXISTS") {
      return NextResponse.json({ error: "Email already registered" }, { status: 409 });
    }

    console.error('Setup account creation failed:', error);
    return NextResponse.json({ error: "Invalid request or expired invitation" }, { status: 400 });
  }
}

