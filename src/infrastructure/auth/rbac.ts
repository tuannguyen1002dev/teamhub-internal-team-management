import { TokenPayload } from "./jwt";

export type Role = 'ADMIN' | 'USER' | 'OPERATOR';

export const ROLES: Record<Role, number> = {
    USER: 1,
    OPERATOR: 2,
    ADMIN: 3,
};

export class RBAC {
    static canAccess(user: TokenPayload, requiredRole: Role): boolean {
        const userRoleValue = ROLES[user.role as Role] || 0;
        const requiredRoleValue = ROLES[requiredRole] || 0;
        return userRoleValue >= requiredRoleValue;
    }

    static isAdmin(user: TokenPayload): boolean {
        return user.role === 'ADMIN';
    }

    static isOperator(user: TokenPayload): boolean {
        return user.role === 'OPERATOR' || user.role === 'ADMIN';
    }
}
