import { NextRequest, NextResponse } from "next/server";
import { verifyAdminCredentials } from "@/lib/admin";
import { setSession } from "@/lib/session";

function buildRedirect(request: NextRequest, path: string, message?: string) {
  const url = new URL(path, request.url);
  if (message) {
    url.searchParams.set("message", message);
  }
  return url;
}

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const username = String(formData.get("username") || "").trim();
  const password = String(formData.get("password") || "").trim();

  if (!verifyAdminCredentials(username, password)) {
    return NextResponse.redirect(buildRedirect(request, "/admin/login", "管理者帳密錯誤。"), 303);
  }

  await setSession({ sub: username, role: "admin" });
  return NextResponse.redirect(buildRedirect(request, "/admin"), 303);
}
