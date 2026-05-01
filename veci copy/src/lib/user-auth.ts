import { randomUUID } from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
};

type Session = {
  token: string;
  userId: string;
  createdAt: string;
};

type AuthStore = {
  users: AuthUser[];
  sessions: Session[];
};

const DATA_DIR = path.join(process.cwd(), "data");
const AUTH_FILE = path.join(DATA_DIR, "user-auth.json");

const seed: AuthStore = {
  users: [],
  sessions: [],
};

async function ensureAuthFile() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(AUTH_FILE);
  } catch {
    await fs.writeFile(AUTH_FILE, JSON.stringify(seed, null, 2), "utf8");
  }
}

async function readStore(): Promise<AuthStore> {
  await ensureAuthFile();
  const raw = await fs.readFile(AUTH_FILE, "utf8");
  return JSON.parse(raw) as AuthStore;
}

async function writeStore(store: AuthStore) {
  await ensureAuthFile();
  await fs.writeFile(AUTH_FILE, JSON.stringify(store, null, 2), "utf8");
}

export async function signUpUser(input: { name: string; email: string; password: string }) {
  const store = await readStore();
  const email = input.email.trim().toLowerCase();
  const exists = store.users.some((u) => u.email === email);
  if (exists) {
    return { error: "Email already registered" as const };
  }

  const user: AuthUser = {
    id: `usr-${randomUUID().slice(0, 8)}`,
    name: input.name.trim(),
    email,
    password: input.password,
    createdAt: new Date().toISOString(),
  };
  store.users.push(user);
  await writeStore(store);
  return { user };
}

export async function loginUser(input: { email: string; password: string }) {
  const store = await readStore();
  const email = input.email.trim().toLowerCase();
  const user = store.users.find((u) => u.email === email && u.password === input.password);
  if (!user) {
    return { error: "Invalid email or password" as const };
  }
  return { user };
}

export async function createSession(userId: string) {
  const store = await readStore();
  const session: Session = {
    token: `sess-${randomUUID()}`,
    userId,
    createdAt: new Date().toISOString(),
  };
  store.sessions = [session, ...store.sessions].slice(0, 500);
  await writeStore(store);
  return session.token;
}

export async function getUserBySession(token: string) {
  const store = await readStore();
  const session = store.sessions.find((s) => s.token === token);
  if (!session) return null;
  const user = store.users.find((u) => u.id === session.userId);
  if (!user) return null;
  return user;
}

export async function removeSession(token: string) {
  const store = await readStore();
  store.sessions = store.sessions.filter((s) => s.token !== token);
  await writeStore(store);
}
