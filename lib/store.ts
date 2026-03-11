import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { ensureDatabaseSchema, getPool, isDatabaseEnabled } from "@/lib/db";
import { ApplicationRecord, ApplicationStatus, UserRecord } from "@/lib/types";

const dataDir = path.join(process.cwd(), "data");
const applicationsPath = path.join(dataDir, "applications.json");
const usersPath = path.join(dataDir, "users.json");

function mapApplicationRow(row: Record<string, unknown>): ApplicationRecord {
  return {
    id: String(row.id),
    fullName: String(row.full_name),
    email: String(row.email),
    organization: String(row.organization ?? ""),
    reason: String(row.reason),
    notes: String(row.notes ?? ""),
    status: row.status as ApplicationStatus,
    reviewedAt: row.reviewed_at ? new Date(String(row.reviewed_at)).toISOString() : null,
    reviewNotes: String(row.review_notes ?? ""),
    createdAt: new Date(String(row.created_at)).toISOString()
  };
}

function mapUserRow(row: Record<string, unknown>): UserRecord {
  return {
    id: String(row.id),
    fullName: String(row.full_name),
    email: String(row.email),
    organization: String(row.organization ?? ""),
    username: String(row.username),
    passwordHash: String(row.password_hash),
    approvedAt: new Date(String(row.approved_at)).toISOString(),
    applicationId: String(row.application_id),
    createdAt: new Date(String(row.created_at)).toISOString()
  };
}

async function ensureFile(filePath: string) {
  await mkdir(dataDir, { recursive: true });

  try {
    await readFile(filePath, "utf8");
  } catch {
    await writeFile(filePath, "[]", "utf8");
  }
}

async function readJsonFile<T>(filePath: string) {
  await ensureFile(filePath);
  const raw = await readFile(filePath, "utf8");
  return JSON.parse(raw) as T;
}

async function writeJsonFile<T>(filePath: string, data: T) {
  await ensureFile(filePath);
  await writeFile(filePath, JSON.stringify(data, null, 2), "utf8");
}

export async function listApplications() {
  if (isDatabaseEnabled()) {
    await ensureDatabaseSchema();
    const result = await getPool().query(`
      SELECT id, full_name, email, organization, reason, notes, status, reviewed_at, review_notes, created_at
      FROM applications
      ORDER BY created_at DESC
    `);
    return result.rows.map(mapApplicationRow);
  }

  const records = await readJsonFile<ApplicationRecord[]>(applicationsPath);
  return records.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}

export async function createApplication(input: {
  fullName: string;
  email: string;
  organization: string;
  reason: string;
  notes: string;
}) {
  const applications = await listApplications();
  const existingPending = applications.find(
    (item) => item.email.toLowerCase() === input.email.toLowerCase() && item.status === "pending"
  );

  if (existingPending) {
    throw new Error("此 Email 已有待審核申請。");
  }

  const application: ApplicationRecord = {
    id: randomUUID(),
    fullName: input.fullName,
    email: input.email,
    organization: input.organization,
    reason: input.reason,
    notes: input.notes,
    status: "pending",
    reviewedAt: null,
    reviewNotes: "",
    createdAt: new Date().toISOString()
  };

  if (isDatabaseEnabled()) {
    await ensureDatabaseSchema();
    await getPool().query(
      `
        INSERT INTO applications (
          id, full_name, email, organization, reason, notes, status, reviewed_at, review_notes, created_at
        ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
      `,
      [
        application.id,
        application.fullName,
        application.email,
        application.organization,
        application.reason,
        application.notes,
        application.status,
        application.reviewedAt,
        application.reviewNotes,
        application.createdAt
      ]
    );
    return application;
  }

  await writeJsonFile(applicationsPath, [application, ...applications]);
  return application;
}

export async function updateApplicationStatus(input: {
  id: string;
  status: ApplicationStatus;
  reviewNotes: string;
}) {
  if (isDatabaseEnabled()) {
    await ensureDatabaseSchema();
    const result = await getPool().query(
      `
        UPDATE applications
        SET status = $2, review_notes = $3, reviewed_at = NOW()
        WHERE id = $1
        RETURNING id, full_name, email, organization, reason, notes, status, reviewed_at, review_notes, created_at
      `,
      [input.id, input.status, input.reviewNotes]
    );

    if (result.rowCount === 0) {
      throw new Error("找不到申請資料。");
    }

    return mapApplicationRow(result.rows[0]);
  }

  const applications = await listApplications();
  const nextApplications = applications.map((item) =>
    item.id === input.id
      ? {
          ...item,
          status: input.status,
          reviewNotes: input.reviewNotes,
          reviewedAt: new Date().toISOString()
        }
      : item
  );

  const updated = nextApplications.find((item) => item.id === input.id);
  if (!updated) {
    throw new Error("找不到申請資料。");
  }

  await writeJsonFile(applicationsPath, nextApplications);
  return updated;
}

export async function getApplicationById(id: string) {
  if (isDatabaseEnabled()) {
    await ensureDatabaseSchema();
    const result = await getPool().query(
      `
        SELECT id, full_name, email, organization, reason, notes, status, reviewed_at, review_notes, created_at
        FROM applications
        WHERE id = $1
        LIMIT 1
      `,
      [id]
    );
    return result.rowCount ? mapApplicationRow(result.rows[0]) : null;
  }

  const applications = await listApplications();
  return applications.find((item) => item.id === id) ?? null;
}

export async function listUsers() {
  if (isDatabaseEnabled()) {
    await ensureDatabaseSchema();
    const result = await getPool().query(`
      SELECT id, full_name, email, organization, username, password_hash, approved_at, application_id, created_at
      FROM users
      ORDER BY created_at DESC
    `);
    return result.rows.map(mapUserRow);
  }

  const users = await readJsonFile<UserRecord[]>(usersPath);
  return users.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}

export async function getUserByUsername(username: string) {
  const users = await listUsers();
  return users.find((item) => item.username.toLowerCase() === username.toLowerCase()) ?? null;
}

export async function getUserById(id: string) {
  const users = await listUsers();
  return users.find((item) => item.id === id) ?? null;
}

export async function createApprovedUser(input: {
  applicationId: string;
  fullName: string;
  email: string;
  organization: string;
  username: string;
  passwordHash: string;
}) {
  const users = await listUsers();
  const duplicate = users.find(
    (item) =>
      item.username.toLowerCase() === input.username.toLowerCase() ||
      item.email.toLowerCase() === input.email.toLowerCase()
  );

  if (duplicate) {
    throw new Error("帳號或 Email 已存在。");
  }

  const user: UserRecord = {
    id: randomUUID(),
    fullName: input.fullName,
    email: input.email,
    organization: input.organization,
    username: input.username,
    passwordHash: input.passwordHash,
    approvedAt: new Date().toISOString(),
    applicationId: input.applicationId,
    createdAt: new Date().toISOString()
  };

  if (isDatabaseEnabled()) {
    await ensureDatabaseSchema();
    await getPool().query(
      `
        INSERT INTO users (
          id, full_name, email, organization, username, password_hash, approved_at, application_id, created_at
        ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
      `,
      [
        user.id,
        user.fullName,
        user.email,
        user.organization,
        user.username,
        user.passwordHash,
        user.approvedAt,
        user.applicationId,
        user.createdAt
      ]
    );
    return user;
  }

  await writeJsonFile(usersPath, [user, ...users]);
  return user;
}
