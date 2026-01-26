import bcrypt from 'bcryptjs';
import { AccountService } from '@/features/account/application/account.service';
import { signToken } from '@/infrastructure/auth/jwt';
import { LoginPayload } from '../domain/types';
import { cookies } from 'next/headers';

export class AuthApplicationService {
  static async executeLogin(payload: LoginPayload) {
    const { email, password } = payload;

    const account = await AccountService.findByEmail(email);

    if (!account || !account.password) {
      throw new Error('INVALID_CREDENTIALS');
    }

    const isPasswordValid = await bcrypt.compare(password, account.password);

    if (!isPasswordValid) {
      throw new Error('INVALID_CREDENTIALS');
    }

    const tokenPayload = {
      id: account.id,
      email: account.email,
      role: account.role,
      permissions: account.permissions as string[],
      fullname: account.fullname,
    };

    const token = await signToken(tokenPayload);

    // Set HttpOnly cookie
    const cookieStore = await cookies();
    cookieStore.set('accessToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 15, // 15 minutes
      path: '/',
    });

    return {
      user: {
        id: account.id,
        email: account.email,
        role: account.role,
        fullname: account.fullname,
      }
    };
  }

  static async executeLogout() {
    const cookieStore = await cookies();
    cookieStore.set('accessToken', '', {
      httpOnly: true,
      expires: new Date(0),
      path: '/',
    });
  }
}
