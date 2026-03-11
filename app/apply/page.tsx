import Link from "next/link";
import { getSession } from "@/lib/session";
import { SiteHeader } from "@/components/site-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default async function ApplyPage({
  searchParams
}: {
  searchParams: Promise<{ message?: string }>;
}) {
  const session = await getSession();
  const { message } = await searchParams;

  return (
    <div className="min-h-screen">
      <SiteHeader session={session} />
      <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <Card className="p-6 sm:p-8">
          <div className="space-y-4">
            <div>
              <div className="text-sm font-semibold tracking-[0.28em] text-primary">靈圖師</div>
              <h1 className="text-3xl font-black">申請使用 NotebookLM 提示工坊</h1>
              <p className="mt-2 text-sm leading-7 text-muted">
                填寫後會進入待審核清單。經管理者核准後，會由管理者手動提供你的帳號與密碼。
              </p>
            </div>

            {message ? (
              <div className="rounded-2xl border border-primary/30 bg-primary/10 px-4 py-3 text-sm">
                {message}
              </div>
            ) : null}

            <form action="/api/applications" method="post" className="grid gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-semibold">姓名</label>
                  <Input name="fullName" required />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold">Email</label>
                  <Input name="email" type="email" required />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold">單位 / 學校 / 組織</label>
                <Input name="organization" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold">申請原因</label>
                <Textarea name="reason" required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold">補充說明</label>
                <Textarea name="notes" className="min-h-24" />
              </div>
              <div className="flex flex-wrap gap-3">
                <Button type="submit">送出申請</Button>
                <Link href="/login">
                  <Button type="button" variant="outline">
                    我已經有帳密
                  </Button>
                </Link>
              </div>
            </form>
          </div>
        </Card>
      </main>
    </div>
  );
}
