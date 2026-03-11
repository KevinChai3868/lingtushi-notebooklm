import { requireAdminSession } from "@/lib/session";
import { listApplications, listUsers } from "@/lib/store";
import { SiteHeader } from "@/components/site-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default async function AdminPage({
  searchParams
}: {
  searchParams: Promise<{ message?: string }>;
}) {
  const session = await requireAdminSession();
  const applications = await listApplications();
  const users = await listUsers();
  const { message } = await searchParams;

  const pending = applications.filter((item) => item.status === "pending");
  const reviewed = applications.filter((item) => item.status !== "pending");

  return (
    <div className="min-h-screen">
      <SiteHeader session={session} />
      <main className="mx-auto max-w-[1500px] px-4 py-10 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <Card className="p-6">
            <h1 className="text-3xl font-black">審核後台</h1>
            <p className="mt-2 text-sm leading-7 text-muted">
              你可以先審核申請，再手動建立帳號與密碼提供給核准者。
            </p>
            {message ? (
              <div className="mt-4 rounded-2xl border border-primary/30 bg-primary/10 px-4 py-3 text-sm">
                {message}
              </div>
            ) : null}
          </Card>

          <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
            <Card className="p-6">
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-2xl font-black">待審核申請</h2>
                <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                  {pending.length} 筆
                </span>
              </div>

              <div className="mt-5 grid gap-4">
                {pending.length === 0 ? (
                  <div className="rounded-2xl border border-border bg-[#fffaf0] px-4 py-6 text-sm text-muted">
                    目前沒有待審核申請。
                  </div>
                ) : null}

                {pending.map((application) => (
                  <div key={application.id} className="rounded-[24px] border border-border bg-[#fffdf8] p-5">
                    <div className="grid gap-2 text-sm leading-7">
                      <div><span className="font-bold">姓名：</span>{application.fullName}</div>
                      <div><span className="font-bold">Email：</span>{application.email}</div>
                      <div><span className="font-bold">單位：</span>{application.organization || "未填寫"}</div>
                      <div><span className="font-bold">申請原因：</span>{application.reason}</div>
                      <div><span className="font-bold">補充：</span>{application.notes || "無"}</div>
                    </div>

                    <div className="mt-4 grid gap-4 lg:grid-cols-2">
                      <form action={`/api/admin/applications/${application.id}/approve`} method="post" className="grid gap-3 rounded-2xl border border-primary/20 bg-primary/5 p-4">
                        <div className="text-sm font-bold">核准並建立帳號</div>
                        <Input name="username" placeholder="帳號，例如 teacher01" required />
                        <Input name="password" type="text" placeholder="初始密碼" required />
                        <Textarea name="reviewNotes" className="min-h-20" placeholder="審核備註" />
                        <Button type="submit">核准</Button>
                      </form>

                      <form action={`/api/admin/applications/${application.id}/reject`} method="post" className="grid gap-3 rounded-2xl border border-accent/20 bg-accent/5 p-4">
                        <div className="text-sm font-bold">退回申請</div>
                        <Textarea name="reviewNotes" className="min-h-20" placeholder="退回原因" />
                        <Button type="submit" variant="outline">退回</Button>
                      </form>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <div className="grid gap-6">
              <Card className="p-6">
                <h2 className="text-2xl font-black">已建立帳號</h2>
                <div className="mt-4 grid gap-3">
                  {users.length === 0 ? (
                    <div className="rounded-2xl border border-border px-4 py-5 text-sm text-muted">
                      尚未建立任何使用者帳號。
                    </div>
                  ) : null}
                  {users.map((user) => (
                    <div key={user.id} className="rounded-2xl border border-border bg-white px-4 py-4 text-sm leading-7">
                      <div className="font-bold">{user.fullName}</div>
                      <div>帳號：{user.username}</div>
                      <div>Email：{user.email}</div>
                      <div>單位：{user.organization || "未填寫"}</div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6">
                <h2 className="text-2xl font-black">已處理申請</h2>
                <div className="mt-4 grid gap-3">
                  {reviewed.length === 0 ? (
                    <div className="rounded-2xl border border-border px-4 py-5 text-sm text-muted">
                      目前沒有已處理申請。
                    </div>
                  ) : null}
                  {reviewed.map((application) => (
                    <div key={application.id} className="rounded-2xl border border-border bg-white px-4 py-4 text-sm leading-7">
                      <div className="flex items-center justify-between gap-3">
                        <div className="font-bold">{application.fullName}</div>
                        <span className="rounded-full bg-[#f6eee0] px-3 py-1 text-xs font-semibold uppercase">
                          {application.status}
                        </span>
                      </div>
                      <div>Email：{application.email}</div>
                      <div>備註：{application.reviewNotes || "無"}</div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
