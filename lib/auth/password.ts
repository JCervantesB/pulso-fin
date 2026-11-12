import { randomBytes, scrypt as scryptCallback, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";

const scrypt = promisify(scryptCallback);

const KEY_LENGTH = 64;

export async function hashPassword(contrasena: string): Promise<string> {
  const sal = randomBytes(16).toString("hex");
  const derivada = (await scrypt(contrasena, sal, KEY_LENGTH)) as Buffer;
  return `${sal}:${derivada.toString("hex")}`;
}

export async function verifyPassword(contrasena: string, guardada: string): Promise<boolean> {
  const [sal, hash] = guardada.split(":");
  if (!sal || !hash) {
    return false;
  }
  const derivada = (await scrypt(contrasena, sal, KEY_LENGTH)) as Buffer;
  const esperada = Buffer.from(hash, "hex");
  if (derivada.length !== esperada.length) {
    return false;
  }
  return timingSafeEqual(derivada, esperada);
}
