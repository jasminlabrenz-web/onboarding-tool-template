import { kv } from "@vercel/kv";
import type { ClientSubmission, AnswerValue } from "@/config/types";
import { generateToken, generateAdminToken } from "./tokens";

const CLIENT_KEY = (token: string) => `client:${token}`;
const ADMIN_KEY = (adminToken: string) => `admin:${adminToken}`;
const CLIENTS_SET = "clients:all";

export async function getClient(token: string): Promise<ClientSubmission | null> {
  const data = await kv.get<ClientSubmission>(CLIENT_KEY(token));
  return data ?? null;
}

export async function getClientByAdminToken(
  adminToken: string,
): Promise<ClientSubmission | null> {
  const token = await kv.get<string>(ADMIN_KEY(adminToken));
  if (!token) return null;
  return getClient(token);
}

export async function saveClient(submission: ClientSubmission): Promise<void> {
  const updated: ClientSubmission = {
    ...submission,
    lastUpdated: new Date().toISOString(),
  };
  await kv.set(CLIENT_KEY(updated.token), updated);
}

export async function updateAnswers(
  token: string,
  patch: Record<string, AnswerValue>,
): Promise<ClientSubmission | null> {
  const existing = await getClient(token);
  if (!existing) return null;
  const updated: ClientSubmission = {
    ...existing,
    answers: { ...existing.answers, ...patch },
    lastUpdated: new Date().toISOString(),
  };
  await kv.set(CLIENT_KEY(token), updated);
  return updated;
}

export async function listClients(): Promise<ClientSubmission[]> {
  const tokens = await kv.smembers(CLIENTS_SET);
  if (!tokens || tokens.length === 0) return [];
  const results = await Promise.all(
    tokens.map((token) => kv.get<ClientSubmission>(CLIENT_KEY(token))),
  );
  return results
    .filter((c): c is ClientSubmission => c !== null)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function createClient(
  clientName: string,
  clientEmail?: string,
): Promise<ClientSubmission> {
  const token = generateToken();
  const adminToken = generateAdminToken();
  const now = new Date().toISOString();
  const submission: ClientSubmission = {
    token,
    adminToken,
    clientName,
    clientEmail,
    createdAt: now,
    lastUpdated: now,
    status: "draft",
    answers: {},
  };
  await kv.set(CLIENT_KEY(token), submission);
  await kv.set(ADMIN_KEY(adminToken), token);
  await kv.sadd(CLIENTS_SET, token);
  return submission;
}

export async function deleteClient(token: string): Promise<void> {
  const client = await getClient(token);
  if (!client) return;
  await kv.del(CLIENT_KEY(token));
  await kv.del(ADMIN_KEY(client.adminToken));
  await kv.srem(CLIENTS_SET, token);
}
