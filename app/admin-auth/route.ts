import { NextRequest, NextResponse } from "next/server";

function renderPage(message?: string) {
  const escapedMessage = message
    ? `<div style="margin-top:16px;border:1px solid rgba(214,95,77,0.3);background:rgba(214,95,77,0.1);border-radius:16px;padding:12px 14px;font-size:14px;">${message}</div>`
    : "";

  return `<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>靈圖師 | 管理者登入</title>
  </head>
  <body style="margin:0;font-family:sans-serif;background:#f6f1e7;color:#172033;">
    <main style="min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px;">
      <div style="width:100%;max-width:480px;background:#fffdf8;border:1px solid #d6c8ae;border-radius:24px;padding:32px;box-shadow:0 16px 50px rgba(23,32,51,0.08);">
        <div style="font-size:13px;letter-spacing:0.24em;color:#0f5d73;font-weight:700;">靈圖師</div>
        <h1 style="margin-top:12px;margin-bottom:8px;font-size:32px;">管理者登入</h1>
        <p style="margin-top:0;color:#6a7282;line-height:1.8;">登入後台以審核申請、建立帳密並管理平台使用者。</p>
        ${escapedMessage}
        <form action="/api/admin/login" method="post" style="margin-top:24px;display:grid;gap:16px;">
          <label style="display:grid;gap:8px;font-size:14px;font-weight:600;">
            管理者帳號
            <input name="username" required style="height:44px;border-radius:12px;border:1px solid #d6c8ae;padding:0 12px;font-size:14px;" />
          </label>
          <label style="display:grid;gap:8px;font-size:14px;font-weight:600;">
            管理者密碼
            <input name="password" type="password" required style="height:44px;border-radius:12px;border:1px solid #d6c8ae;padding:0 12px;font-size:14px;" />
          </label>
          <button type="submit" style="height:44px;border-radius:12px;border:0;background:#0f5d73;color:white;font-size:14px;font-weight:700;cursor:pointer;">
            登入審核後台
          </button>
        </form>
      </div>
    </main>
  </body>
</html>`;
}

export async function GET(request: NextRequest) {
  const message = request.nextUrl.searchParams.get("message") || "";
  return new NextResponse(renderPage(message || undefined), {
    headers: {
      "content-type": "text/html; charset=utf-8"
    }
  });
}
