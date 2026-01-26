import { prisma } from '@/infrastructure/database/prisma';
import bcrypt from "bcryptjs";
import { getCurrentDomain } from "@/shared/utils/common";

export class InvitationService {
    static async list() {
        return await prisma.invitation.findMany();
    }

    static async create(payload: { email: string, role?: string }) {
        const { email, role = 'USER' } = payload;

        if (!email || typeof email !== "string") {
            throw new Error("INVALID_EMAIL");
        }

        // generate a high-entropy short-lived token
        const token = await bcrypt.hash(`${email}-${Date.now()}`, 10);

        // check if invitation already exists
        const existingInvitation = await prisma.invitation.findUnique({
            where: { email },
        });

        if (existingInvitation && existingInvitation.status !== 'EXPIRED') {
            // If already accepted, we don't re-invite
            if (existingInvitation.status === 'ACCEPTED') throw new Error("ALREADY_REGISTERED");
            // If pending, use existing
            return existingInvitation;
        }

        const domain = getCurrentDomain() || 'http://localhost:3000';
        const invLink = `${domain}/accept-invitation?token=${encodeURIComponent(token)}`;

        const created = await prisma.invitation.upsert({
            where: { email },
            update: {
                token,
                role: role as any,
                status: 'PENDING',
                invLink,
                createdAt: new Date()
            },
            create: {
                email,
                role: role as any,
                token,
                invLink,
            },
        });

        return created;
    }

    static async verify(token: string) {
        if (!token) {
            throw new Error("NOT_FOUND"); // Obfuscate missing token
        }

        const invitation = await prisma.invitation.findUnique({
            where: { token },
        });

        if (!invitation) {
            throw new Error("NOT_FOUND");
        }

        if (invitation.status === 'ACCEPTED') {
            throw new Error("ALREADY_ACCEPTED");
        }

        const hoursSinceCreation = (new Date().getTime() - invitation.createdAt.getTime()) / (1000 * 60 * 60);
        if (hoursSinceCreation >= 72 || invitation.status === 'EXPIRED') {
            throw new Error("NOT_FOUND"); // Obfuscate expiry
        }

        return { email: invitation.email, role: invitation.role, message: "VALID" };
    }
}

