import { useRef, type KeyboardEvent } from "react";

/** Arrow / Home / End keyboard navigation for a horizontal tablist (WAI-ARIA tabs pattern). */
export function useTabKeys(count: number, select: (i: number) => void) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    let next = -1;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (i + 1) % count;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = (i - 1 + count) % count;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = count - 1;
    if (next < 0) return;
    e.preventDefault();
    select(next);
    refs.current[next]?.focus();
  };

  const setRef = (i: number) => (el: HTMLButtonElement | null) => {
    refs.current[i] = el;
  };

  return { onKeyDown, setRef };
}
