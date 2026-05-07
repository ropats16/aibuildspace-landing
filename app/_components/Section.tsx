import type { ReactNode } from "react";
import { Container } from "./Container";

type SectionProps = {
  id: string;
  eyebrow?: string;
  title: string;
  lede?: string;
  children?: ReactNode;
  className?: string;
};

export function Section({
  id,
  eyebrow,
  title,
  lede,
  children,
  className = "",
}: SectionProps) {
  return (
    <section id={id} className={`scroll-mt-20 py-14 sm:py-16 lg:py-20 ${className}`}>
      <Container>
        <div className="max-w-3xl">
          {eyebrow && (
            <p className="mb-4 text-xs tracking-[0.18em] text-muted">
              {eyebrow}
            </p>
          )}
          <h2 className="font-display text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
            {title}
          </h2>
          {lede && (
            <p className="mt-5 text-lg leading-relaxed text-muted">{lede}</p>
          )}
        </div>
        {children}
      </Container>
    </section>
  );
}

export function PlaceholderNote({ children }: { children: ReactNode }) {
  return (
    <div className="mt-10 rounded-2xl border border-dashed border-border bg-card/50 p-8 text-sm text-muted">
      {children}
    </div>
  );
}
