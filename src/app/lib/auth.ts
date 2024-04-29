// utils/auth.ts

import { setCookie, parseCookies, destroyCookie } from 'nookies';

const ACCESS_NAME = 'accessToken'

// Function to save the access token as a secure cookie
export const saveAccessToken = (accessToken: string): void => {
  
  setCookie(null, ACCESS_NAME, accessToken, {
    maxAge: 30 * 24 * 60 * 60,
    path: '/',
    httpOnly: true,
    secure: true,
    sameSite: 'strict'
  });
};

// Function to retrieve the access token from cookies
export const getAccessToken = (): string | null => {
  const cookies = parseCookies();
  return cookies.ACCESS_NAME || null;
};

// Function to clear the access token from cookies
export const clearAccessToken = (): void => {
  destroyCookie(null, ACCESS_NAME);
};
