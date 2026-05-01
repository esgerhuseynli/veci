import { cookies } from "next/headers";

const COOKIE_NAME = "veci_admin_session";

export type UserRole = "admin" | "worker";

type AuthInput = {
  role: UserRole;
  email: string;
  password: string;
};

function getExpectedCredentials(role: UserRole) {
  if (role === "worker") {
    return {
      email: process.env.WORKER_EMAIL ?? "worker@veci.local",
      password: process.env.WORKER_PASSWORD ?? "worker123",
    };
  }
  return {
    email: process.env.ADMIN_EMAIL ?? "admin@veci.local",
    password: process.env.ADMIN_PASSWORD ?? "admin123",
  };
}

export function isValidCredentials(input: AuthInput) {
  const expected = getExpectedCredentials(input.role);
  return (
    input.email.trim().toLowerCase() === expected.email.trim().toLowerCase() &&
    input.password === expected.password
  );
}

export function setAdminSession(role: UserRole) {
  cookies().set(COOKIE_NAME, role, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
}

export function clearAdminSession() {
  cookies().set(COOKIE_NAME, "", { path: "/", maxAge: 0 });
}

export function getSessionRole(): UserRole | null {
  const value = cookies().get(COOKIE_NAME)?.value;
  if (value === "admin" || value === "worker") {
    return value;
  }
  return null;
}

export function isAdminAuthenticated() {
  return getSessionRole() !== null;
}
