// lib/utils.ts
import { v4 as uuidv4 } from 'uuid';

export function generateVerificationToken(): string {
  return uuidv4();
}
export function generateDisplayName(email: string): string {
  const dpPrefix = ["unni", "oppa", "noona", "hyeong"];
  const dpSuffix = ["Kimchi", "Bap", "Doenjang", "Gochujang", "Bulgogi"];

  const emailPart = email.split('@')[0] || '';
  const truncatedEmail = emailPart.substring(0, 6);
  const randomPrefix = dpPrefix[Math.floor(Math.random() * dpPrefix.length)];
  const randomSuffix = dpSuffix[Math.floor(Math.random() * dpSuffix.length)];
  const randomNum = Math.floor(Math.random() * 900 + 100); // 100-999

  return `${randomPrefix}${truncatedEmail}${randomNum}${randomSuffix}`;
}


