import { prisma } from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcryptjs";

import EmailTemplate from '@/components/services/welcomEmail';
import { Resend } from 'resend';

const resend = new Resend("re_YEgEFwYL_5uBr8koJzAULpumLuugpAeTm");

// GET all users
export async function GET(req: NextRequest) {
  const { pathname, searchParams } = req.nextUrl;
  if (pathname.endsWith('/accept')) {
    const token = searchParams.get('token');
    const email = searchParams.get('email');

    if (!token || !email) {
      return NextResponse.json({ error: 'Missing token or email' }, { status: 400 });
    }

    try {
      // Find the invitation by email
      const invitation = await prisma.invitation.findUnique({
        where: { email },
      });

      if (!invitation) {
        return NextResponse.json({ error: 'Invitation not found' }, { status: 404 });
      }

      // Compare the hashed token from DB with the one from URL
      const isMatch = await bcrypt.compare(invitation.token, token);

      if (!isMatch) {
        return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
      }

      // Update the invitation status
      await prisma.invitation.update({
        where: { email },
        data: { status: 'ACCEPTED' },
      });

      return NextResponse.json({
        message: 'Invitation verified successfully',
        email,
      });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
  } else if (pathname.endsWith('/verifyEmail')) {
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json({ error: 'Missing email' }, { status: 400 });
    }

    try {
      // Find the invitation by email
      const invitation = await prisma.invitation.findUnique({
        where: { email },
      });

      if (!invitation) {
        return NextResponse.json({ error: 'Invitation not found' }, { status: 404 });
      }

      return NextResponse.json({
        message: 'Invitation found',
        email,
        status: invitation.status,
      });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
  } else {
    try {
      const invitations = await prisma.invitation.findMany({
        where: { acceptedAt: null },
      });
      return NextResponse.json(invitations);
    } catch (error) {
      return NextResponse.json({ error: "Failed to fetch invitations" }, { status: 500 });
    }
  }
}

export async function POST(req: NextRequest) {
  // try {
  //   const { email } = await req.json();
  //   if (!email || typeof email !== "string") {
  //     return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  //   }

  //   // generate a token for the invitation (using email + timestamp hashed)
  //   const token = await bcrypt.hash(`${email}-${Date.now()}`, 10);

  //   const { data, error } = await resend.emails.send({
  //     from: 'Teamhub - Internal team management <teamhubApp@resend.dev>',
  //     to: ['tuannguyen1002dev@gmail.com'],
  //     subject: `${email}You're invited!`,
  //     react: EmailTemplate({ email: email, token: token }),
  //   });

  //   if (error) {
  //     return NextResponse.json(error, { status: 400 });
  //   } else {
  //     await prisma.invitation.create({
  //       data: {
  //         email,
  //         token,
  //       },
  //     });
  //   }

  //   return NextResponse.json((data), { status: 201 });
  // } catch (error) {
  //   console.error("Error creating invitation:", error);
  //   return NextResponse.json({ error: "Failed to create invitation" }, { status: 500 });
  // }

  try {

    const { email } = await req.json();
    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    // generate a token for the invitation (using email + timestamp hashed)
    const token = await bcrypt.hash(`${email}-${Date.now()}`, 10);

    //check if invitation already exists
    const existingInvitation = await prisma.invitation.findUnique({
      where: { email },
    });

    if (existingInvitation) {
      return NextResponse.json({ error: "Invitation already exists for this email" }, { status: 400 });
    }


    // create email content and send invitation
    const { data, error } = await resend.emails.send({
      from: 'Teamhub - Internal team management <teamhubApp@resend.dev>',
      to: [email],
      subject: `You're invited to TeamHub!`,
      react: EmailTemplate({ email: email, token: token }),
    });

    if (error) {
      return NextResponse.json(error, { status: 400 });
    } else {
      await prisma.invitation.create({
        data: {
          email: email,
          token: token,
        },
      });
      return NextResponse.json((data), { status: 201 });
    }

  } catch (error) {
    console.error("Error creating invitation:", error);
    return NextResponse.json({ error: "Failed to create invitation" }, { status: 500 });
  }
}

