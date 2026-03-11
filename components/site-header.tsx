import Link from "next/link";
import { SessionPayload } from "@/lib/types";
import { cn } from "@/lib/utils";
import { BrandMark } from "@/components/brand-mark";
import { Button } from "@/components/ui/button";

type SiteHeaderProps = {
  session: SessionPayload | null;
};

export function SiteHeader({ session }: SiteHeaderProps) {
  const linkButtonClass =
    "inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold transition";

  return (
    <header className="border-b border-border bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-foreground">
          <BrandMark compact />
        </Link>
        <nav className="flex flex-wrap items-center gap-2">
          <Link href="/apply" className={cn(linkButtonClass, "text-foreground hover:bg-white/60")}>
            申請使用
          </Link>
          {session?.role === "user" ? (
            <Link href="/dashboard" className={cn(linkButtonClass, "border border-border bg-card text-foreground hover:bg-white")}>
              進入平台
            </Link>
          ) : null}
          {session?.role === "admin" ? (
            <Link href="/admin" className={cn(linkButtonClass, "border border-border bg-card text-foreground hover:bg-white")}>
              審核後台
            </Link>
          ) : null}
          {!session ? (
            <>
              <Link href="/login" className={cn(linkButtonClass, "border border-border bg-card text-foreground hover:bg-white")}>
                使用者登入
              </Link>
              <Link href="/admin/login" className={cn(linkButtonClass, "bg-primary text-white hover:bg-primary/90 shadow-[0_10px_24px_rgba(15,93,115,0.18)]")}>
                管理者登入
              </Link>
            </>
          ) : (
            <form action="/api/auth/logout" method="post">
              <Button type="submit">登出</Button>
            </form>
          )}
        </nav>
      </div>
    </header>
  );
}
