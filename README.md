# 靈圖師 NotebookLM 提示工坊

靈圖師 NotebookLM 提示工坊，專為教師、學生與知識工作者設計，用來快速產出高品質、具教學價值與視覺邏輯的 NotebookLM 圖表提示詞。

目前已內建「申請制 + 管理者審核 + 帳密登入」流程：

- 公開訪客只能看到首頁、申請頁與登入頁
- 使用者需先送出申請
- 管理者登入後台審核
- 核准後由管理者建立帳號與密碼
- 只有取得帳密的使用者才能登入 `/dashboard`

## 技術架構

- Next.js App Router
- TypeScript
- Tailwind CSS
- shadcn/ui 風格元件結構
- JSON/TypeScript 資料設定

## 功能特色

- 設定式提示詞生成器
- 使用者輸入優先保留，系統僅補強不足處
- 三種輸出模式：精簡版、完整版、專家版
- 四格漫畫模式，會自動展開四格內容要求
- 教學模式、行政簡報模式
- 創意度與專業度滑桿
- 載入範例、清空、複製、匯出 `txt` / `markdown`
- 申請式存取控管
- 管理者審核後台
- 帳密登入與 session 保護

## 啟動方式

```bash
npm install
npm run dev
```

預設網址：

```bash
http://localhost:3000
```

## 環境變數

在專案根目錄建立 `.env.local`：

```bash
SESSION_SECRET=replace-this-with-a-long-random-secret
ADMIN_USERNAME=admin
ADMIN_PASSWORD=replace-this-admin-password
DATABASE_URL=postgresql://user:password@host:5432/dbname?sslmode=require
```

可選：

```bash
ADMIN_PASSWORD_HASH=如果你想改用雜湊後密碼，可提供此值
```

## 使用方式

1. 管理者先設定 `.env.local`
2. 啟動後，訪客到 `/apply` 送出申請
3. 管理者到 `/admin/login` 登入
4. 在 `/admin` 審核申請，核准時指定使用者帳號與密碼
5. 使用者用你提供的帳密到 `/login` 登入

## 雲端部署

目前系統支援兩種儲存模式：

- 有設定 `DATABASE_URL`：使用 PostgreSQL，適合雲端部署
- 沒有設定 `DATABASE_URL`：退回本機 `data/*.json`，適合本地開發

### 建議部署組合

- 前端與 API：Vercel
- 資料庫：Neon / Supabase / Railway PostgreSQL / 任意 PostgreSQL

### 雲端部署步驟

1. 建立 PostgreSQL 資料庫。
2. 取得 `DATABASE_URL`。
3. 在部署平台設定環境變數：
   - `SESSION_SECRET`
   - `ADMIN_USERNAME`
   - `ADMIN_PASSWORD`
   - `DATABASE_URL`
4. 部署 Next.js 專案。
5. 第一次開啟系統時，資料表會自動建立。

### 注意事項

- 正式環境一定要設定強密碼與長隨機字串的 `SESSION_SECRET`
- 若使用雲端 PostgreSQL，系統會自動走資料庫，不再使用本機 JSON
- 若部署平台是 serverless，這一版仍可運作，前提是 `DATABASE_URL` 必須正確設定

Deployment note: production redeploy trigger updated on 2026-03-11.

## 專案結構

```text
.
|-- app
|   |-- globals.css
|   |-- layout.tsx
|   `-- page.tsx
|-- components
|   |-- prompt-builder.tsx
|   `-- ui
|       |-- button.tsx
|       |-- card.tsx
|       |-- checkbox-group.tsx
|       |-- input.tsx
|       |-- select.tsx
|       `-- textarea.tsx
|-- lib
|   |-- data.ts
|   |-- prompt-builder.ts
|   |-- types.ts
|   `-- utils.ts
|-- next-env.d.ts
|-- next.config.ts
|-- package.json
|-- postcss.config.js
|-- README.md
|-- tailwind.config.ts
`-- tsconfig.json
```

## 生成邏輯

1. 讀取使用者自訂欄位。
2. 讀取下拉選項、勾選欄位與滑桿設定。
3. 若資料不足，系統用補充建議強化完整度，但不覆蓋使用者原意。
4. 生成自然流暢的 NotebookLM 提示詞，包含：
- 主題
- 目標受眾
- 圖表形式
- 風格要求
- 內容深度
- 視覺設計
- 創意元素
- 閱讀性要求
- 限制條件

## 預設範例

- 工業革命比較
- AI 發展時間軸
- 民主制度流程
- 細胞構造比較
- AI 教學應用分類
- 假訊息判讀四格漫畫
- 生成式AI倫理四格漫畫

## 備註

目前元件採用 shadcn/ui 的檔案分層與 Tailwind 組合方式，以便後續直接替換成正式 CLI 產生的元件或擴充設計系統。
