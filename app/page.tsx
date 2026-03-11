import Link from "next/link";
import { getSession } from "@/lib/session";
import { BrandMark } from "@/components/brand-mark";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default async function HomePage() {
  const session = await getSession();

  return (
    <div className="min-h-screen">
      <SiteHeader session={session} />
      <main className="mx-auto max-w-[1400px] px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <Card className="overflow-hidden">
            <div className="bg-[linear-gradient(135deg,rgba(15,93,115,0.95),rgba(25,126,148,0.88))] px-6 py-10 text-white sm:px-8">
              <div className="max-w-3xl space-y-5">
                <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold tracking-[0.18em]">
                  靈感構圖 × 教學設計 × NotebookLM
                </span>
                <BrandMark />
                <p className="max-w-2xl text-base leading-8 text-white/88">
                  將教學重點、知識結構與創意視覺轉成可直接使用的 NotebookLM 提示詞。平台採申請審核制，只有經你核准並發放帳密的使用者才能登入。
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link href="/apply">
                    <Button variant="secondary">申請使用</Button>
                  </Link>
                  {!session ? (
                    <Link href="/login">
                      <Button variant="outline" className="border-white/30 bg-white/10 text-white hover:bg-white/20">
                        已有帳密，前往登入
                      </Button>
                    </Link>
                  ) : null}
                  {session?.role === "user" ? (
                    <Link href="/dashboard">
                      <Button variant="outline" className="border-white/30 bg-white/10 text-white hover:bg-white/20">
                        進入使用後台
                      </Button>
                    </Link>
                  ) : null}
                  {session?.role === "admin" ? (
                    <Link href="/admin">
                      <Button variant="outline" className="border-white/30 bg-white/10 text-white hover:bg-white/20">
                        進入審核後台
                      </Button>
                    </Link>
                  ) : null}
                </div>
              </div>
            </div>
          </Card>

          <div className="grid gap-6">
            <Card className="p-6">
              <h2 className="text-2xl font-black">啟用流程</h2>
              <div className="mt-4 grid gap-3">
                {[
                  "1. 使用者提交申請，說明用途與背景",
                  "2. 管理者登入後台，逐筆審核申請內容",
                  "3. 核准後建立帳號與初始密碼並通知對方",
                  "4. 使用者登入後進入靈圖師工作台生成提示詞"
                ].map((item) => (
                  <div key={item} className="rounded-2xl border border-border bg-[#fffaf0] px-4 py-4 text-sm font-medium">
                    {item}
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-2xl font-black">品牌定位</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {[
                  "校內教師社群的共用提示平台",
                  "研習課程與工作坊的專屬工具站",
                  "教學顧問團隊的內部創作中台",
                  "可控開放的教育科技產品入口"
                ].map((item) => (
                  <div key={item} className="rounded-2xl border border-border px-4 py-4 text-sm">
                    {item}
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
