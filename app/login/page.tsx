import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { SiteHeader } from "@/components/site-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default async function LoginPage({
  searchParams
}: {
  searchParams: Promise<{ message?: string }>;
}) {
  const session = await getSession();
  if (session?.role === "user") {
    redirect("/dashboard");
  }

  const { message } = await searchParams;

  return (
    <div className="min-h-screen">
      <SiteHeader session={session} />
      <main className="mx-auto max-w-xl px-4 py-10 sm:px-6 lg:px-8">
        <Card className="p-6 sm:p-8">
          <div className="text-sm font-semibold tracking-[0.28em] text-primary">靈圖師</div>
          <h1 className="text-3xl font-black">登入 NotebookLM 提示工坊</h1>
          <p className="mt-2 text-sm leading-7 text-muted">
            只有經管理者核准並取得帳號密碼的使用者，才能登入使用平台。
          </p>
          {message ? (
            <div className="mt-4 rounded-2xl border border-accent/30 bg-accent/10 px-4 py-3 text-sm">
              {message}
            </div>
          ) : null}
          <form action="/api/auth/login" method="post" className="mt-6 grid gap-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold">帳號</label>
              <Input name="username" required />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold">密碼</label>
              <Input name="password" type="password" required />
            </div>
            <Button type="submit">登入平台</Button>
          </form>
        </Card>
      </main>
    </div>
  );
}
