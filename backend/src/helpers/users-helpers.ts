import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export function encryptedPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}
  
export function comparePassword(password: string, userPassword: string): Promise<boolean> {
  return bcrypt.compare(password, userPassword);
}

export function generateToken(userId: number): string {
  return jwt.sign({ userId }, process.env.JWT_SECRET);
}
