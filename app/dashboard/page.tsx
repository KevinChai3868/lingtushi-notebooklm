import { getUserById } from "@/lib/store";
import { requireUserSession } from "@/lib/session";
import { SiteHeader } from "@/components/site-header";
import { PromptBuilder } from "@/components/prompt-builder";

export default async function DashboardPage() {
  const session = await requireUserSession();
  const user = await getUserById(session.sub);

  return (
    <div className="min-h-screen">
      <SiteHeader session={session} />
      <div className="mx-auto max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-4 rounded-[24px] border border-border bg-white/80 px-5 py-4 text-sm shadow-panel">
          <div className="font-bold">已登入</div>
          <div className="text-muted">
            {user?.fullName || "使用者"} / {user?.organization || "未填寫單位"} / 帳號 {user?.username || "-"}
          </div>
        </div>
      </div>
      <PromptBuilder />
    </div>
  );
}
