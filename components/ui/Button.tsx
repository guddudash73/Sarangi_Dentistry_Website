import Link from "next/link";
import { ReactNode } from "react";

/**
 * Unified Button component — use this everywhere across the site.
 *
 * variant:
 *   "primary"  → solid green (default)
 *   "outline"  → white/bordered, green text  — for light backgrounds
 *   "ghost"    → semi-transparent white text  — for dark/image backgrounds
 *   "white"    → solid white, dark text       — for dark/primary backgrounds
 */

type ButtonVariant = "primary" | "outline" | "ghost" | "white";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: ButtonVariant;
  /** Pass true when used inside a flex row that should stretch it */
  fullWidth?: boolean;
};

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-white shadow-[0_16px_40px_rgba(62,161,111,0.24)] hover:bg-primary-hover hover:shadow-[0_20px_48px_rgba(62,161,111,0.32)]",
  outline:
    "border border-[#cfe0d7] bg-white/85 text-primary-hover shadow-[0_10px_24px_rgba(20,40,34,0.05)] hover:bg-white hover:border-primary/40",
  ghost:
    "border border-white/25 bg-white/10 text-white backdrop-blur hover:bg-white/18",
  white:
    "bg-white text-[#2f5548] shadow-[0_16px_40px_rgba(255,255,255,0.14)] hover:bg-white/90",
};

const BASE =
  "inline-flex min-h-14 items-center justify-center gap-2 rounded-[22px] px-8 py-4 text-sm font-bold uppercase tracking-[0.22em] transition-all duration-300 hover:-translate-y-1";

export default function Button({
  children,
  href,
  className = "",
  onClick,
  type = "button",
  variant = "primary",
  fullWidth = false,
}: ButtonProps) {
  const classes = [
    BASE,
    VARIANT_CLASSES[variant],
    fullWidth ? "w-full" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (href) {
    return (
      <Link href={href} className={classes} onClick={onClick}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick}>
      {children}
    </button>
  );
}
