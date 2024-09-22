'use server';

import { cookies } from 'next/headers';

export async function logout() {
  cookies().delete({
    name: 'jwt',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 3, // 3 days in seconds
    path: '/',
    secure: true,
    domain:
      process.env.NODE_ENV === 'production' ? '.vercel.app' : 'localhost',
    sameSite: 'none',
  });
}
