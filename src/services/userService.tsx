import bcrypt from "bcryptjs";
import { prisma } from "../lib/prisma";

export async function createUser(email: string, password: string, name?: string) {
  const hashedPassword = await bcrypt.hash(password, 10);

  return prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      username: email.split('@')[0],
    },
  });
}
