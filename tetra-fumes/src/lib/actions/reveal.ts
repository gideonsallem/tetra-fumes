export interface RevealOptions {
  /** Transition delay in milliseconds. */
  delay?: number;
}

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia(REDUCED_MOTION_QUERY).matches
  );
}

function setDelay(node: Element, delay?: number): void {
  const styled = node as Element & { style?: CSSStyleDeclaration };
  if (!styled.style) return;
  if (typeof delay === "number" && Number.isFinite(delay) && delay > 0) {
    styled.style.setProperty("--d", `${delay}ms`);
  } else {
    styled.style.removeProperty("--d");
  }
}

export function reveal(node: Element, options: RevealOptions = {}) {
  node.classList.add("reveal");
  setDelay(node, options.delay);

  const canObserve = typeof IntersectionObserver !== "undefined";

  if (prefersReducedMotion() || !canObserve) {
    node.classList.add("in");
    return {
      update(next: RevealOptions = {}) {
        setDelay(node, next.delay);
      },
      destroy() {
        /* nothing to clean up */
      },
    };
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          node.classList.add("in");
          observer.unobserve(node);
        }
      }
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -8% 0px",
    },
  );

  observer.observe(node);

  return {
    update(next: RevealOptions = {}) {
      setDelay(node, next.delay);
    },
    destroy() {
      observer.disconnect();
    },
  };
}

export default reveal;
