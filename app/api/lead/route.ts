import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

export const runtime = "nodejs";

const leadSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(120),
  email: z.email("Enter a valid email").max(200),
  description: z
    .string()
    .trim()
    .min(10, "Tell me a bit more")
    .max(4000),
  dataSources: z.string().trim().max(1000).optional(),
  // Honeypot: real users leave this empty. Bots fill it.
  // We accept any string here and silently bounce non-empty values below.
  website: z.string().optional(),
});

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Validation failed", issues: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const data = parsed.data;

  if (data.website && data.website.length > 0) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_TO_EMAIL;
  const from = process.env.LEAD_FROM_EMAIL ?? "AI Buildspace <onboarding@resend.dev>";

  if (!apiKey || !to) {
    console.error("Lead form misconfigured: missing RESEND_API_KEY or LEAD_TO_EMAIL");
    return NextResponse.json(
      { ok: false, error: "Server misconfigured" },
      { status: 500 },
    );
  }

  const resend = new Resend(apiKey);
  const subject = `New lead from ${data.name}`;
  const text = [
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    data.dataSources ? `Data sources: ${data.dataSources}` : null,
    "",
    "Project description:",
    data.description,
  ]
    .filter(Boolean)
    .join("\n");

  try {
    const result = await resend.emails.send({
      from,
      to,
      replyTo: data.email,
      subject,
      text,
    });
    if (result.error) {
      console.error("Resend send error", result.error);
      return NextResponse.json(
        { ok: false, error: "Send failed" },
        { status: 500 },
      );
    }
  } catch (err) {
    console.error("Lead route exception", err);
    return NextResponse.json(
      { ok: false, error: "Send failed" },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
