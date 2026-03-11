import { Pool } from "pg";

declare global {
  // eslint-disable-next-line no-var
  var __pgPool: Pool | undefined;
  // eslint-disable-next-line no-var
  var __pgInit: Promise<void> | undefined;
}

function getDatabaseUrl() {
  return process.env.DATABASE_URL;
}

export function isDatabaseEnabled() {
  return Boolean(getDatabaseUrl());
}

export function getPool() {
  const connectionString = getDatabaseUrl();
  if (!connectionString) {
    throw new Error("DATABASE_URL 未設定。");
  }

  if (!global.__pgPool) {
    global.__pgPool = new Pool({
      connectionString,
      ssl: connectionString.includes("localhost") ? false : { rejectUnauthorized: false }
    });
  }

  return global.__pgPool;
}

export async function ensureDatabaseSchema() {
  if (!isDatabaseEnabled()) {
    return;
  }

  if (!global.__pgInit) {
    global.__pgInit = (async () => {
      const pool = getPool();
      await pool.query(`
        CREATE TABLE IF NOT EXISTS applications (
          id UUID PRIMARY KEY,
          full_name TEXT NOT NULL,
          email TEXT NOT NULL,
          organization TEXT NOT NULL DEFAULT '',
          reason TEXT NOT NULL,
          notes TEXT NOT NULL DEFAULT '',
          status TEXT NOT NULL,
          reviewed_at TIMESTAMPTZ,
          review_notes TEXT NOT NULL DEFAULT '',
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );
      `);

      await pool.query(`
        CREATE TABLE IF NOT EXISTS users (
          id UUID PRIMARY KEY,
          full_name TEXT NOT NULL,
          email TEXT NOT NULL UNIQUE,
          organization TEXT NOT NULL DEFAULT '',
          username TEXT NOT NULL UNIQUE,
          password_hash TEXT NOT NULL,
          approved_at TIMESTAMPTZ NOT NULL,
          application_id UUID NOT NULL,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );
      `);

      await pool.query(`
        CREATE INDEX IF NOT EXISTS idx_applications_email_status
        ON applications (email, status);
      `);
    })();
  }

  await global.__pgInit;
}
