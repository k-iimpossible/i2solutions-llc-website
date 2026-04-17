import type { ReactNode } from "react";

type SectionHeaderProps = {
  id?: string;
  eyebrow?: string;
  title: string;
  description?: ReactNode;
  align?: "center" | "left";
};

export function SectionHeader({ id, eyebrow, title, description, align = "center" }: SectionHeaderProps) {
  const alignClass = align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl";

  return (
    <div className={alignClass}>
      {eyebrow && (
        <p className="mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-primary">
          <span className="h-px w-8 bg-gradient-to-r from-transparent to-primary" aria-hidden />
          {eyebrow}
          <span className="h-px w-8 bg-gradient-to-l from-transparent to-primary" aria-hidden />
        </p>
      )}
      <h2
        id={id}
        className="bg-gradient-to-br from-foreground via-violet-600/90 to-cyan-600 bg-clip-text text-3xl font-extrabold tracking-tight text-transparent dark:from-white dark:via-violet-300 dark:to-cyan-300 sm:text-4xl"
      >
        {title}
      </h2>
      {description && <div className="mt-4 text-lg text-muted">{description}</div>}
    </div>
  );
}
