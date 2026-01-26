import { NextResponse, NextRequest } from "next/server";
import { AccountService } from "@/features/account/application/account.service";

export async function GET() {
  try {
    const accountList = await AccountService.list();
    return NextResponse.json(accountList);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch accounts" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();
    const result = await AccountService.create(payload);
    return NextResponse.json(result, { status: 201 });
  } catch (error: any) {
    if (error.message === "INVALID_INVITATION") {
      return NextResponse.json({ error: "Invalid invitation token or email" }, { status: 401 });
    }
    if (error.message === "INVITATION_EXPIRED") {
      return NextResponse.json({ error: "Invitation has expired" }, { status: 400 });
    }
    if (error.message === "EMAIL_EXISTS") {
      return NextResponse.json({ error: "Email already registered" }, { status: 401 });
    }
    return NextResponse.json({ error: "Failed to create account" }, { status: 500 });
  }
}