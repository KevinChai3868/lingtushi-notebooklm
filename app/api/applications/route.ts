import { NextRequest, NextResponse } from "next/server";
import { createApplication } from "@/lib/store";

function redirectWithMessage(request: NextRequest, path: string, message: string) {
  const url = new URL(path, request.url);
  url.searchParams.set("message", message);
  return NextResponse.redirect(url, 303);
}

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const fullName = String(formData.get("fullName") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const organization = String(formData.get("organization") || "").trim();
  const reason = String(formData.get("reason") || "").trim();
  const notes = String(formData.get("notes") || "").trim();

  if (!fullName || !email || !reason) {
    return redirectWithMessage(request, "/apply", "請完整填寫姓名、Email 與申請原因。");
  }

  try {
    await createApplication({
      fullName,
      email,
      organization,
      reason,
      notes
    });
    return redirectWithMessage(request, "/apply", "申請已送出，等待管理者審核。");
  } catch (error) {
    return redirectWithMessage(request, "/apply", error instanceof Error ? error.message : "送出失敗。");
  }
}
