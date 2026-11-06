import type { ReactNode } from "react";

export function PageIntro({
  eyebrow,
  title,
  children,
  className = "",
  eyebrowClassName = "text-[13px]",
}: {
  eyebrow: string;
  title: string;
  children?: ReactNode;
  className?: string;
  eyebrowClassName?: string;
}) {
  return (
    <section className={`animate-rise ${className}`}>
      <p className={`m-0 font-semibold tracking-[0.22em] uppercase ${eyebrowClassName}`}>{eyebrow}</p>
      <h1 className="mt-3.5 mb-0 font-serif text-[46px] leading-[0.95] font-medium tracking-[-0.02em] sm:text-[56px] lg:text-[66px]">
        {title}
      </h1>
      {children}
    </section>
  );
}

export function Chip({ children, variant = "outline", size = "md" }: { children: ReactNode; variant?: "outline" | "solid"; size?: "sm" | "md" }) {
  const sizes = size === "sm" ? "px-2.5 py-1 text-[12.5px]" : "px-3 py-1.5 text-[13px]";
  const look = variant === "solid" ? "bg-panel text-cream" : "border border-panel text-panel";
  return <span className={`inline-block rounded-full font-medium ${sizes} ${look}`}>{children}</span>;
}

export function ExternalArrow() {
  return <span aria-hidden="true"> ↗</span>;
}
