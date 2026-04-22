import { Resend } from "resend";
import { NextResponse, type NextRequest } from "next/server";

const MAX_NAME = 200;
const MAX_DETAILS = 20000;

const DEFAULT_TO = "digitaldroid420@gmail.com";
/** Resend’s test sender (https://resend.com/docs) — use RESEND_FROM_EMAIL with your domain after it’s verified. */
const DEFAULT_FROM = "onboarding@resend.dev";

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

type Body = {
  name?: unknown;
  email?: unknown;
  details?: unknown;
};

export async function POST(request: NextRequest) {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    return NextResponse.json({ error: "Email is not configured (missing RESEND_API_KEY)." }, { status: 503 });
  }

  const to = (process.env.CONTACT_TO_EMAIL?.trim() || DEFAULT_TO) as string;
  const from = (process.env.RESEND_FROM_EMAIL?.trim() || DEFAULT_FROM) as string;

  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const details = typeof body.details === "string" ? body.details.trim() : "";

  if (!name || name.length > MAX_NAME) {
    return NextResponse.json({ error: "Name is required (max 200 characters)." }, { status: 400 });
  }
  if (!email || !isValidEmail(email)) {
    return NextResponse.json({ error: "A valid email is required." }, { status: 400 });
  }
  if (!details || details.length > MAX_DETAILS) {
    return NextResponse.json(
      { error: `Project details are required (max ${MAX_DETAILS} characters).` },
      { status: 400 },
    );
  }

  const resend = new Resend(key);

  const subject = `Contact: ${name}`.slice(0, 998);
  const text = [`Name: ${name}`, `Email: ${email}`, "", details].join("\n");
  const html = [
    `<p><strong>Name</strong> ${escapeHtml(name)}</p>`,
    `<p><strong>Email</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>`,
    `<p><strong>Project details</strong></p><p>${escapeHtml(details).replace(/\n/g, "<br/>")}</p>`,
  ].join("");

  const { error } = await resend.emails.send({
    from,
    to: [to],
    replyTo: email,
    subject,
    text,
    html,
  });

  if (error) {
    console.error("[contact]", error);
    return NextResponse.json({ error: "Could not send your message. Please try again later." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
