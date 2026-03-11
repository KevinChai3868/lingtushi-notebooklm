import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { updateApplicationStatus } from "@/lib/store";

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
  const formData = await request.formData();
  const reviewNotes = String(formData.get("reviewNotes") || "").trim();

  try {
    await updateApplicationStatus({
      id,
      status: "rejected",
      reviewNotes
    });
    return redirectWithMessage(request, "申請已退回。");
  } catch (error) {
    return redirectWithMessage(request, error instanceof Error ? error.message : "退回失敗。");
  }
}
