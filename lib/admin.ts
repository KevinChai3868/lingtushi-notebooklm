import { verifyPassword } from "@/lib/security";

export function getAdminUsername() {
  return (process.env.ADMIN_USERNAME || "admin").trim().toLowerCase();
}

export function verifyAdminCredentials(username: string, password: string) {
  const normalizedUsername = username.trim().toLowerCase();
  const normalizedPassword = password.trim();

  if (normalizedUsername !== getAdminUsername()) {
    return false;
  }

  if (process.env.ADMIN_PASSWORD_HASH) {
    return verifyPassword(normalizedPassword, process.env.ADMIN_PASSWORD_HASH.trim());
  }

  return normalizedPassword === (process.env.ADMIN_PASSWORD || "change-this-admin-password").trim();
}
