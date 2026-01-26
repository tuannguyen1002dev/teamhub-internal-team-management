import { prisma } from "@/infrastructure/database/prisma";
import bcrypt from "bcryptjs";

export class AccountService {
    static async list() {
        return await prisma.account.findMany();
    }

    static async findByEmail(email: string) {
        return await prisma.account.findUnique({ where: { email } });
    }

    static async create(payload: any) {
        const { email, fullname, username, dateofbirth, phone, address, token, password } = payload;

        const invitation = await prisma.invitation.findUnique({
            where: { token },
        });

        // 1. Obfuscated Validation: Treat all errors as INVALID
        if (!invitation || invitation.email !== email) {
            throw new Error("NOT_FOUND"); // Should bubble to 404
        }

        const isExpired = (new Date().getTime() - invitation.createdAt.getTime()) / (1000 * 60 * 60) >= 72;
        if (isExpired) {
            throw new Error("NOT_FOUND"); // Obfuscate expiry as 404
        }

        if (invitation.status === 'ACCEPTED') {
            throw new Error("ALREADY_ACCEPTED");
        }

        const emailExists = await prisma.account.findUnique({ where: { email } });
        if (emailExists) {
            throw new Error("EMAIL_EXISTS");
        }

        await prisma.$transaction(async (tx) => {
            await tx.account.create({
                data: {
                    email,
                    fullname,
                    username,
                    dateofbirth: dateofbirth ? new Date(dateofbirth) : null,
                    phone,
                    address,
                    password: await bcrypt.hash(password, 10),
                    role: invitation.role, // ROLE COMES FROM SERVER DATA ONLY
                    permissions: ["READ", "WRITE"], // Default limited permissions
                    status: "ACTIVE"
                },
            });

            await tx.invitation.update({
                where: { token },
                data: { status: 'ACCEPTED' },
            });
        });

        return { message: "Account created successfully" };
    }
}
