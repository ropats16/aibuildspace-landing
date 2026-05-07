"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "submitting" | "success" | "error";

const inputBase =
  "w-full rounded-xl border border-border bg-card px-3.5 py-2.5 text-[15px] text-ink placeholder:text-muted/60 transition-colors focus:border-ink focus:outline-none focus:ring-2 focus:ring-accent/30";

const labelBase =
  "mb-1.5 block text-xs font-medium uppercase tracking-[0.14em] text-muted";

export function LeadForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      description: String(formData.get("description") ?? ""),
      dataSources: String(formData.get("dataSources") ?? ""),
      website: String(formData.get("website") ?? ""),
    };

    setStatus("submitting");
    setErrorMsg(null);

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(
          typeof body?.error === "string" ? body.error : "Something went wrong",
        );
      }
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  if (status === "success") {
    return (
      <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-7 sm:p-8">
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-accent">
          Sent
        </p>
        <h3 className="mt-3 font-display text-2xl font-semibold leading-tight tracking-tight">
          Thanks — I&rsquo;ll reply within a day.
        </h3>
        <p className="mt-3 text-[15px] leading-relaxed text-muted">
          If it&rsquo;s clearly a fit, I&rsquo;ll send a Cal.com link. If not,
          I&rsquo;ll point you at someone who is.
        </p>
        <button
          type="button"
          onClick={() => {
            setStatus("idle");
            setErrorMsg(null);
          }}
          className="mt-6 inline-flex h-10 w-fit items-center rounded-full border border-border bg-card px-4 text-sm font-medium text-ink transition-colors hover:bg-border/40"
        >
          Send another
        </button>
      </div>
    );
  }

  const submitting = status === "submitting";

  return (
    <form
      onSubmit={handleSubmit}
      noValidate={false}
      aria-describedby="lead-form-hint"
      className="flex h-full flex-col rounded-2xl border border-border bg-card p-7 sm:p-8"
    >
      <p
        id="lead-form-hint"
        className="text-xs font-medium uppercase tracking-[0.14em] text-muted"
      >
        Describe your problem
      </p>
      <h3 className="mt-3 font-display text-2xl font-semibold leading-tight tracking-tight">
        Tell me your data sources — I&rsquo;ll say if it&rsquo;s a fit.
      </h3>

      <div className="mt-6 space-y-4">
        <div>
          <label htmlFor="lead-name" className={labelBase}>
            Name
          </label>
          <input
            id="lead-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            maxLength={120}
            disabled={submitting}
            className={inputBase}
          />
        </div>

        <div>
          <label htmlFor="lead-email" className={labelBase}>
            Email
          </label>
          <input
            id="lead-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            maxLength={200}
            disabled={submitting}
            className={inputBase}
          />
        </div>

        <div>
          <label htmlFor="lead-description" className={labelBase}>
            What do you want to fix?
          </label>
          <textarea
            id="lead-description"
            name="description"
            required
            minLength={10}
            maxLength={4000}
            rows={5}
            disabled={submitting}
            placeholder="A workflow you keep doing manually, a one-off you'd run weekly, a system you'd hand a new hire…"
            aria-describedby="lead-description-hint"
            className={`${inputBase} resize-y`}
          />
          <p
            id="lead-description-hint"
            className="mt-1.5 text-xs text-muted"
          >
            A paragraph or two is plenty.
          </p>
        </div>

        <div>
          <label htmlFor="lead-data" className={labelBase}>
            Data sources <span className="lowercase tracking-normal text-muted/70">(optional)</span>
          </label>
          <input
            id="lead-data"
            name="dataSources"
            type="text"
            maxLength={1000}
            disabled={submitting}
            placeholder="Gmail, Notion, Stripe, GA4…"
            aria-describedby="lead-data-hint"
            className={inputBase}
          />
          <p id="lead-data-hint" className="mt-1.5 text-xs text-muted">
            Helps me scope-check before the call.
          </p>
        </div>

        <div className="hidden" aria-hidden="true">
          <label htmlFor="lead-website">
            Website (leave blank)
            <input
              id="lead-website"
              name="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
            />
          </label>
        </div>
      </div>

      {status === "error" && errorMsg && (
        <div
          role="alert"
          className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
        >
          {errorMsg}. Try again or email{" "}
          <a className="underline" href="mailto:hello@aibuildspace.com">
            hello@aibuildspace.com
          </a>
          .
        </div>
      )}

      <div className="mt-6 flex items-center justify-between gap-4">
        <p className="text-xs text-muted">
          I reply within a day. No mailing list.
        </p>
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex h-11 items-center rounded-full bg-accent px-5 text-sm font-medium text-accent-ink transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? "Sending…" : "Send"}
        </button>
      </div>
    </form>
  );
}
