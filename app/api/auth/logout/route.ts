import { NextResponse } from "next/server";
import { clearSessionOnResponse } from "@/lib/session";

export async function POST(request: Request) {
  const response = NextResponse.redirect(new URL("/", request.url), 303);
  return clearSessionOnResponse(response);
}
