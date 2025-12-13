import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

// GET all users
export async function GET() {
  try {
    const users = await prisma.user.findMany(); // Example model "User"
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {

  try {
    const { email, fullname, username, dateOfBirth, phoneNumber, address, token, password } = await req.json();

    // create new user based on invitation acceptance
    const invitationExists = await prisma.invitation.findUnique({ where: { email, token }, });
    const checkInvitationExpiry = invitationExists && (new Date().getTime() - invitationExists.createdAt.getTime()) / (1000 * 60 * 60) < 72;
    const emailExists = await prisma.user.findUnique({ where: { email }, });

    if (!invitationExists) {
      return NextResponse.json({ error: "Invalid invitation token or email" }, { status: 401 });
    }
    if (!checkInvitationExpiry) {
      return NextResponse.json({ error: "Invitation has expired" }, { status: 400 });
    }
    if (!emailExists) {
      return NextResponse.json({ error: "Email already registered" }, { status: 401 });
    }

    await prisma.$transaction(async (tx) => {
      const newUser = await tx.user.create({
        data: {
          email,
          fullname,
          username,
          dateOfBirth: new Date(dateOfBirth),
          phoneNumber,
          address,
          password: await bcrypt.hash(password, 10), // default password, should prompt change on first login
          role: "USER",
          permissions: ["READ"], // 
        },
      })

      await tx.invitation.update({
        where: { token },
        data: {
          status: 'ACCEPTED',
        },
      })
    })
    return NextResponse.json({ message: "create user successfully" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
  }
}