import { verifyPassword } from "@/lib/security";

export function getAdminUsername() {
  return process.env.ADMIN_USERNAME || "admin";
}

export function verifyAdminCredentials(username: string, password: string) {
  if (username !== getAdminUsername()) {
    return false;
  }

  if (process.env.ADMIN_PASSWORD_HASH) {
    return verifyPassword(password, process.env.ADMIN_PASSWORD_HASH);
  }

  return password === (process.env.ADMIN_PASSWORD || "change-this-admin-password");
}
