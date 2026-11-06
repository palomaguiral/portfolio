"use client";

import { useEffect, useRef, useState } from "react";

type Props = { email: string; copy: string; copied: string; label: string };

export default function CopyEmail({ email, copy, copied, label }: Props) {
  const [done, setDone] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      // Clipboard can be blocked (e.g. insecure context); still show feedback.
    }
    setDone(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setDone(false), 1800);
  };

  return (
    <button
      type="button"
      onClick={onCopy}
      aria-label={done ? copied : label}
      className="min-h-9 cursor-pointer rounded-full border border-cream bg-transparent px-3.5 py-2 text-[13px] font-semibold text-cream hover:bg-cream/10"
    >
      <span aria-live="polite">{done ? copied : copy}</span>
    </button>
  );
}
