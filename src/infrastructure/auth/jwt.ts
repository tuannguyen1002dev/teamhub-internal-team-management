import * as jose from 'jose';

const AUTH_SECRET = new TextEncoder().encode(process.env.AUTH_SECRET || 'fallback-secret-for-dev-only-32-chars-at-least');

export interface TokenPayload {
  id: string;
  email: string;
  role: string;
  permissions: string[];
  fullname?: string | null;
}

export const signToken = async (payload: TokenPayload): Promise<string> => {
  return await new jose.SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('15m')
    .setIssuedAt()
    .sign(AUTH_SECRET);
};

export const verifyToken = async (token: string): Promise<TokenPayload | null> => {
  try {
    const { payload } = await jose.jwtVerify(token, AUTH_SECRET);
    return payload as unknown as TokenPayload;
  } catch (error) {
    return null;
  }
};

export const signRefreshToken = async (payload: { userId: string }): Promise<string> => {
  return await new jose.SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('7d')
    .setIssuedAt()
    .sign(AUTH_SECRET);
};
