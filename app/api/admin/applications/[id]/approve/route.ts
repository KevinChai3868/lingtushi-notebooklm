import { NextRequest, NextResponse } from "next/server";
import { hashPassword } from "@/lib/security";
import { createApprovedUser, getApplicationById, updateApplicationStatus } from "@/lib/store";
import { getSession } from "@/lib/session";

function redirectWithMessage(request: NextRequest, message: string) {
  const url = new URL("/admin", request.url);
  url.searchParams.set("message", message);
  return NextResponse.redirect(url, 303);
}

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session || session.role !== "admin") {
    return redirectWithMessage(request, "請先以管理者登入。");
  }

  const { id } = await context.params;
  const application = await getApplicationById(id);
  if (!application) {
    return redirectWithMessage(request, "找不到申請資料。");
  }

  const formData = await request.formData();
  const username = String(formData.get("username") || "").trim();
  const password = String(formData.get("password") || "").trim();
  const reviewNotes = String(formData.get("reviewNotes") || "").trim();

  if (!username || !password) {
    return redirectWithMessage(request, "核准時必須指定帳號與密碼。");
  }

  try {
    await createApprovedUser({
      applicationId: application.id,
      fullName: application.fullName,
      email: application.email,
      organization: application.organization,
      username,
      passwordHash: hashPassword(password)
    });

    await updateApplicationStatus({
      id: application.id,
      status: "approved",
      reviewNotes
    });

    return redirectWithMessage(request, `已核准 ${application.fullName}，請將帳密提供給申請者。`);
  } catch (error) {
    return redirectWithMessage(request, error instanceof Error ? error.message : "核准失敗。");
  }
}
