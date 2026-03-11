import { NextRequest, NextResponse } from "next/server";
import { getUserByUsername } from "@/lib/store";
import { verifyPassword } from "@/lib/security";
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

  if (!username || !password) {
    return NextResponse.redirect(buildRedirect(request, "/login", "請輸入帳號與密碼。"), 303);
  }

  const user = await getUserByUsername(username);
  if (!user || !verifyPassword(password, user.passwordHash)) {
    return NextResponse.redirect(buildRedirect(request, "/login", "帳號或密碼錯誤。"), 303);
  }

  const response = NextResponse.redirect(buildRedirect(request, "/dashboard"), 303);
  return setSessionOnResponse(response, { sub: user.id, role: "user" });
}
