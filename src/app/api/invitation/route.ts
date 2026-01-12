import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from '@/lib/prisma';
import EmailTemplate from '@/components/services/welcomEmail';
// import { Resend } from 'resend'; //! THIS FEATURE REQUIRES A PAID RESEND PLAN TO WORK; currently disabled
import { getCurrentDomain } from "@/shared/utils/common";
// const resend = new Resend("re_YEgEFwYL_5uBr8koJzAULpumLuugpAeTm"); //! THIS FEATURE REQUIRES A PAID RESEND PLAN TO WORK; currently disabled

// GET all users
export async function GET(req: NextRequest) {
  const { searchParams, search } = req.nextUrl;
  const receivedToken = searchParams.get('token');
  // send all exsisting invitations
  try {
    const invitations = await prisma.invitation.findMany();
    return NextResponse.json(invitations);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch invitations" }, { status: 500 });
  }

}

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    // generate a token for the invitation (using email + timestamp hashed)
    const token = await bcrypt.hash(`${email}`, 10);

    //check if invitation already exists
    const existingInvitation = await prisma.invitation.findUnique({
      where: { email },
    });

    if (existingInvitation) {
      return NextResponse.json({ error: "Invitation already exists for this email" }, { status: 401 });
    }

    // create email content and send invitation //! THIS FEATURE REQUIRES A PAID RESEND PLAN TO WORK; currently disabled
    // const { data, error } = await resend.emails.send({
    //   from: 'Teamhub - Internal team management <teamhubApp@resend.dev>',
    //   to: [email],
    //   subject: `You're invited to TeamHub!`,
    //   react: EmailTemplate({ email: email, token: token }),
    // });

    const created = await prisma.invitation.create({
      data: {
        email: email,
        token: token,
        invLink: `${!getCurrentDomain() ? "localhost:3000" : "checkpoint"}/accept-invitation?token=${encodeURIComponent(token)}`,
      },
    });
    return NextResponse.json(created, { status: 201 });

  } catch (error) {
    return NextResponse.json({ error: "Failed to create invitation" }, { status: 500 });
  }
}

