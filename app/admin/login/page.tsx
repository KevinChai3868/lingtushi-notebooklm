import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";

export default async function AdminLoginPage({
  searchParams
}: {
  searchParams: Promise<{ message?: string }>;
}) {
  const session = await getSession();
  if (session?.role === "admin") {
    redirect("/admin");
  }

  const { message } = await searchParams;

  return (
    <html lang="zh-Hant">
      <body style={{ margin: 0, fontFamily: "sans-serif", background: "#f6f1e7", color: "#172033" }}>
        <main
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px"
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "480px",
              background: "#fffdf8",
              border: "1px solid #d6c8ae",
              borderRadius: "24px",
              padding: "32px",
              boxShadow: "0 16px 50px rgba(23,32,51,0.08)"
            }}
          >
            <div style={{ fontSize: "13px", letterSpacing: "0.24em", color: "#0f5d73", fontWeight: 700 }}>
              靈圖師
            </div>
            <h1 style={{ marginTop: "12px", marginBottom: "8px", fontSize: "32px" }}>管理者登入</h1>
            <p style={{ marginTop: 0, color: "#6a7282", lineHeight: 1.8 }}>
              登入後台以審核申請、建立帳密並管理平台使用者。
            </p>

            {message ? (
              <div
                style={{
                  marginTop: "16px",
                  border: "1px solid rgba(214,95,77,0.3)",
                  background: "rgba(214,95,77,0.1)",
                  borderRadius: "16px",
                  padding: "12px 14px",
                  fontSize: "14px"
                }}
              >
                {message}
              </div>
            ) : null}

            <form action="/api/admin/login" method="post" style={{ marginTop: "24px", display: "grid", gap: "16px" }}>
              <label style={{ display: "grid", gap: "8px", fontSize: "14px", fontWeight: 600 }}>
                管理者帳號
                <input
                  name="username"
                  required
                  style={{
                    height: "44px",
                    borderRadius: "12px",
                    border: "1px solid #d6c8ae",
                    padding: "0 12px",
                    fontSize: "14px"
                  }}
                />
              </label>
              <label style={{ display: "grid", gap: "8px", fontSize: "14px", fontWeight: 600 }}>
                管理者密碼
                <input
                  name="password"
                  type="password"
                  required
                  style={{
                    height: "44px",
                    borderRadius: "12px",
                    border: "1px solid #d6c8ae",
                    padding: "0 12px",
                    fontSize: "14px"
                  }}
                />
              </label>
              <button
                type="submit"
                style={{
                  height: "44px",
                  borderRadius: "12px",
                  border: 0,
                  background: "#0f5d73",
                  color: "white",
                  fontSize: "14px",
                  fontWeight: 700,
                  cursor: "pointer"
                }}
              >
                登入審核後台
              </button>
            </form>
          </div>
        </main>
      </body>
    </html>
  );
}
