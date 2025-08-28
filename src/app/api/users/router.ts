import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET all users
export async function GET() {
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ error: "Error fetching users" }, { status: 500 });
  }
}

// POST create a new user
export async function POST(request: Request) {
  try {
    const { email, fullName, username, phoneNumber, dateOfBirth, address } = await request.json();

    // Basic validation
    if (!email || !fullName || !username) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const newUser = await prisma.user.create({
      data: {
        email,
        fullName,
        username,
        phoneNumber,
        dateOfBirth: new Date(dateOfBirth),
        address,
        passwords: "defaultPassword", // In a real app, hash the password and handle securely
        role: "user", // Default role
      },
    });

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ error: "Error creating user" }, { status: 500 });
  }
}