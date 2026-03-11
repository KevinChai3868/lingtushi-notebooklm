import { NextRequest, NextResponse } from "next/server";

function mask(value: string | undefined) {
  if (!value) {
    return null;
  }

  const trimmed = value.trim();
  if (trimmed.length <= 2) {
    return "*".repeat(trimmed.length);
  }

  return `${trimmed[0]}${"*".repeat(Math.max(trimmed.length - 2, 1))}${trimmed[trimmed.length - 1]}`;
}

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token") || "";
  const expected = process.env.SESSION_SECRET || "";

  if (!expected || token !== expected) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const adminUsername = process.env.ADMIN_USERNAME;
  const adminPassword = process.env.ADMIN_PASSWORD;

  return NextResponse.json({
    ok: true,
    adminUsername: {
      exists: Boolean(adminUsername),
      normalized: (adminUsername || "").trim().toLowerCase(),
      length: (adminUsername || "").trim().length,
      masked: mask(adminUsername)
    },
    adminPassword: {
      exists: Boolean(adminPassword),
      length: (adminPassword || "").trim().length,
      masked: mask(adminPassword)
    },
    sessionSecret: {
      exists: Boolean(process.env.SESSION_SECRET),
      length: (process.env.SESSION_SECRET || "").trim().length
    },
    nodeEnv: process.env.NODE_ENV || null
  });
}
