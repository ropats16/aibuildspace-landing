import { NextResponse } from "next/server";

// ---------------------------------------------------------------------------
// Lock down the Keystatic admin in production.
//
// Keystatic runs in `local` storage mode (see keystatic.config.ts), which has
// NO authentication and writes to the server filesystem. That is fine on a dev
// machine but must never be reachable on the deployed site, where it would let
// anyone open the editor. Content is authored locally, committed, and pushed;
// the production deploy only ever READS posts, so it has no need for the admin.
//
// We allow the admin only when:
//   - running outside production (local `next dev`), or
//   - GitHub storage mode is enabled (Keystatic's own GitHub auth gates it).
// Otherwise `/keystatic` and `/api/keystatic` return 404, as if absent.
//
// In Next 16 the `middleware` convention was renamed to `proxy` (Node runtime).
// ---------------------------------------------------------------------------

const adminAllowed =
  process.env.NODE_ENV !== "production" ||
  process.env.KEYSTATIC_STORAGE === "github";

export function proxy() {
  if (adminAllowed) return NextResponse.next();

  // Production + local mode: hide the editor entirely.
  return new NextResponse("Not found", { status: 404 });
}

export const config = {
  matcher: ["/keystatic", "/keystatic/:path*", "/api/keystatic/:path*"],
};
