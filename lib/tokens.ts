import { customAlphabet } from "nanoid";

const alphabet = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

const tokenGen = customAlphabet(alphabet, 16);
const adminTokenGen = customAlphabet(alphabet, 24);

export function generateToken(): string {
  return tokenGen();
}

export function generateAdminToken(): string {
  return adminTokenGen();
}
