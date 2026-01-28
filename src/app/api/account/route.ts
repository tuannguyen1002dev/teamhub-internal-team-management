import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

// GET all Accounts
export async function GET() {
  try {
    const accountList = await prisma.account.findMany(); // Example model "Account"
    return NextResponse.json(accountList);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch accounts" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { email, fullname, username, dateofbirth, phone, address, token, password } = await req.json();

    // create new account based on invitation acceptance
    const invitationExists = await prisma.invitation.findUnique({ where: { email, token }, });
    const checkInvitationExpiry = invitationExists && (new Date().getTime() - invitationExists.createdAt.getTime()) / (1000 * 60 * 60) < 72;
    const emailExists = await prisma.account.findUnique({ where: { email }, });

    if (!invitationExists) {
      return NextResponse.json({ error: "Invalid invitation token or email" }, { status: 401 });
    }
    if (!checkInvitationExpiry) {
      return NextResponse.json({ error: "Invitation has expired" }, { status: 400 });
    }
    if (!emailExists) {
      return NextResponse.json({ error: "Email already registered" }, { status: 401 });
    }

  await prisma.$transaction(async (tx: any) => {
      const newAccount = await tx.account.create({
        data: {
          email,
          fullname,
          username,
          dateofbirth: new Date(dateofbirth),
          phone,
          address,
          password: await bcrypt.hash(password, 10),
          role: "USER",
          permissions: ["READ", "WRITE", "UPDATE", "DELETE"],
        },
      })

      await tx.invitation.update({
        where: { token },
        data: {
          status: 'ACCEPTED',
        },
      })
    })
    return NextResponse.json({ message: "create account successfully" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create account" }, { status: 500 });
  }
}