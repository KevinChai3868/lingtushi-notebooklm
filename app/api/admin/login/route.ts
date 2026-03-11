import { NextRequest, NextResponse } from "next/server";
import { verifyAdminCredentials } from "@/lib/admin";
import { setSessionOnResponse } from "@/lib/session";

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

  const response = NextResponse.redirect(buildRedirect(request, "/admin"), 303);
  return setSessionOnResponse(response, { sub: username, role: "admin" });
}
