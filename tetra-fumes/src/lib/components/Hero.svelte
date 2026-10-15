<script lang="ts">
  import { hero } from '$lib/content';

  let sectionEl: HTMLElement | null = $state(null);
  let videoEl: HTMLVideoElement | null = $state(null);
  let showReplay = $state(false);
  let wasAway = $state(false);
  let hasStarted = $state(false);
  let reducedMotion = $state(false);

  const lines = $derived.by(() => {
    const parts = hero.title.split(/(?<=\.)\s+/);
    return parts.length >= 2 ? [parts[0], parts.slice(1).join(' ')] : [hero.title, ''];
  });

  /* Track prefers-reduced-motion */
  $effect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    reducedMotion = mq.matches;

    const onChange = (e: MediaQueryListEvent) => {
      reducedMotion = e.matches;
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  });

  /* Scroll-aware playback via IntersectionObserver */
  $effect(() => {
    const section = sectionEl;
    const video = videoEl;
    if (!section || !video) return;

    /* Synchronous read to keep the effect reactive to reduced-motion changes */
    const reduced = reducedMotion;
    if (reduced) {
      try {
        video.pause();
      } catch {
        /* noop */
      }
      return;
    }

    if (typeof IntersectionObserver === 'undefined') return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const ratio = entry.intersectionRatio;

          if (ratio < 0.15) {
            try {
              video.pause();
            } catch {
              /* noop */
            }
            if (hasStarted) {
              wasAway = true;
            }
          } else if (ratio >= 0.6) {
            if (!hasStarted || wasAway) {
              try {
                video.currentTime = 0;
              } catch {
                /* noop */
              }
              try {
                const p = video.play();
                if (p && typeof p.catch === 'function') p.catch(() => {});
              } catch {
                /* autoplay blocked — poster remains */
              }
              wasAway = false;
              hasStarted = true;
              showReplay = false;
            }
          }
        }
      },
      { threshold: [0, 0.15, 0.6] }
    );

    io.observe(section);
    return () => io.disconnect();
  });

  function onEnded() {
    showReplay = true;
  }

  function replay() {
    const el = videoEl;
    if (!el) return;
    showReplay = false;
    try {
      el.currentTime = 0;
    } catch {
      /* noop */
    }
    try {
      const p = el.play();
      if (p && typeof p.catch === 'function') p.catch(() => {});
    } catch {
      /* noop */
    }
    hasStarted = true;
    wasAway = false;
  }
</script>

<section id="hero" class="hero" bind:this={sectionEl}>
  <video
    bind:this={videoEl}
    class="hero-video"
    muted
    playsinline
    preload="auto"
    poster="/images/hero-poster.png"
    aria-hidden="true"
    tabindex="-1"
    onended={onEnded}
  >
    <source src="/videos/hero.mp4" type="video/mp4" />
  </video>

  <div class="overlay overlay-bottom" aria-hidden="true"></div>
  <div class="overlay overlay-left" aria-hidden="true"></div>
  <div class="overlay overlay-vignette" aria-hidden="true"></div>

  <div class="content container">
    <p class="eyebrow hero-eyebrow">{hero.eyebrow}</p>

    <h1 class="hero-title">
      <span class="title-line">
        <span class="title-inner anim-1">{lines[0]}</span>
      </span>
      {#if lines[1]}
        <span class="title-line">
          <span class="title-inner anim-2">{lines[1]}</span>
        </span>
      {/if}
    </h1>

    <p class="hero-sub">{hero.sub}</p>

    <div class="hero-actions">
      <a class="btn" href={hero.primary.href}>{hero.primary.label}</a>
      <a class="btn-ghost" href={hero.secondary.href}>{hero.secondary.label}</a>
    </div>
  </div>

  <div class="corner">
    {#if showReplay}
      <button type="button" class="replay" onclick={replay} aria-label="Replay video">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
          <path d="M3 12a9 9 0 1 0 3-6.7" stroke-linecap="round" />
          <path d="M3 4v5h5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </button>
    {/if}

    <div class="scroll-cue" aria-hidden="true">
      <span class="scroll-label">Scroll</span>
      <span class="scroll-track">
        <span class="scroll-dot"></span>
      </span>
    </div>
  </div>
</section>

<style>
  .hero {
    position: relative;
    height: 100svh;
    overflow: hidden;
    background: var(--obsidian);
    isolation: isolate;
  }

  .hero-video {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: 50% 50%;
    filter: saturate(0.85) contrast(1.03);
  }

  .overlay {
    position: absolute;
    inset: 0;
    pointer-events: none;
  }

  .overlay-bottom {
    background: linear-gradient(
      to top,
      rgba(11, 10, 9, 0.85) 0%,
      rgba(11, 10, 9, 0.55) 22%,
      rgba(11, 10, 9, 0.2) 40%,
      rgba(11, 10, 9, 0) 55%
    );
  }

  .overlay-left {
    background: linear-gradient(
      to right,
      rgba(11, 10, 9, 0.55) 0%,
      rgba(11, 10, 9, 0.25) 30%,
      rgba(11, 10, 9, 0) 60%
    );
  }

  .overlay-vignette {
    background: radial-gradient(
      120% 90% at 50% 40%,
      rgba(11, 10, 9, 0) 40%,
      rgba(11, 10, 9, 0.35) 100%
    );
  }

  .content {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    padding-bottom: clamp(2.5rem, 8vh, 6rem);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1.25rem;
    z-index: 2;
    max-width: 1280px;
    margin-inline: auto;
    pointer-events: none;
  }
  .content > * {
    pointer-events: auto;
  }

  .hero-eyebrow {
    opacity: 0;
    animation: fadeUp 0.9s var(--ease) 1.3s forwards;
  }

  /* ---- Headline ---- */
  .hero-title {
    font-family: 'Syne', ui-sans-serif, system-ui, sans-serif;
    font-weight: 700;
    text-transform: uppercase;
    font-size: clamp(2.4rem, 6.2vw, 5.5rem);
    letter-spacing: 0.06em;
    line-height: 1.02;
    margin: 0 0 clamp(1rem, 2.5vw, 1.75rem) 0;
    max-width: 16ch;
  }

  .title-line {
    display: block;
  }

  .title-inner {
    display: inline-block;
    opacity: 0;
    transform: translateY(28px);
    will-change: opacity, transform;
  }

  .title-inner.anim-1 {
    animation: fadeUp 1.1s var(--ease) 1.6s forwards;
  }
  .title-inner.anim-2 {
    animation: fadeUp 1.1s var(--ease) 2s forwards;
  }

  /* ---- Sub ---- */
  .hero-sub {
    max-width: 34rem;
    color: rgba(237, 231, 221, 0.8);
    font-family: 'DM Sans', ui-sans-serif, system-ui, sans-serif;
    font-size: clamp(1rem, 1.3vw, 1.1rem);
    line-height: 1.7;
    margin-top: 0.5rem;
    opacity: 0;
    animation: fadeUp 1s var(--ease) 2.5s forwards;
  }

  /* ---- Buttons ---- */
  .hero-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.85rem;
    margin-top: 0.25rem;
    opacity: 0;
    animation: fadeUp 1s var(--ease) 2.9s forwards;
  }

  @keyframes fadeUp {
    to {
      opacity: 1;
      transform: none;
    }
  }

  /* ---- Corner controls ---- */
  .corner {
    position: absolute;
    right: clamp(1.25rem, 4vw, 3rem);
    bottom: clamp(1.5rem, 4vh, 3rem);
    z-index: 3;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  .scroll-cue {
    display: none;
    flex-direction: column;
    align-items: center;
    gap: 0.7rem;
    font-family: 'Space Mono', ui-monospace, monospace;
    font-size: 0.6rem;
    letter-spacing: 0.28em;
    text-transform: uppercase;
    color: var(--ash);
  }
  .scroll-track {
    position: relative;
    width: 1px;
    height: 48px;
    background: var(--line-strong);
  }
  .scroll-dot {
    position: absolute;
    left: 50%;
    top: 0;
    width: 5px;
    height: 5px;
    border-radius: 999px;
    background: var(--amber);
    transform: translateX(-50%);
    animation: dotTravel 2.2s var(--ease) infinite;
  }
  @keyframes dotTravel {
    0% {
      top: 0;
      opacity: 0;
    }
    15% {
      opacity: 1;
    }
    85% {
      opacity: 1;
    }
    100% {
      top: calc(100% - 5px);
      opacity: 0;
    }
  }

  .replay {
    width: 44px;
    height: 44px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: 1px solid var(--line-strong);
    border-radius: 999px;
    background: rgba(11, 10, 9, 0.5);
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
    color: var(--bone);
    cursor: pointer;
    transition:
      color var(--t-fast) var(--ease),
      border-color var(--t-fast) var(--ease),
      transform var(--t-fast) var(--ease);
  }
  .replay:hover {
    color: var(--amber);
    border-color: var(--amber);
    transform: translateY(-2px);
  }
  .replay svg {
    width: 18px;
    height: 18px;
  }

  @media (min-width: 700px) {
    .scroll-cue {
      display: flex;
    }
  }

  /* ---- Short viewports (laptops like 1366x768) ---- */
  @media (max-height: 720px) and (min-width: 700px) {
    .content {
      padding-bottom: 2rem;
      gap: 0.9rem;
    }
    .hero-title {
      font-size: clamp(2.2rem, 5.4vw, 4rem);
      margin-bottom: 0.85rem;
    }
    .hero-sub {
      font-size: 0.98rem;
      margin-top: 0.25rem;
    }
    .hero-actions {
      margin-top: 0;
    }
  }

  /* ---- Small mobile ---- */
  @media (max-width: 420px) {
    .content {
      padding-bottom: 2.25rem;
      gap: 1rem;
    }
    .hero-title {
      font-size: clamp(2.1rem, 9vw, 2.8rem);
      margin-bottom: 1rem;
    }
    .hero-sub {
      font-size: 0.95rem;
      margin-top: 0.35rem;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .hero-eyebrow,
    .title-inner,
    .hero-sub,
    .hero-actions {
      opacity: 1;
      transform: none;
      animation: none;
    }
    .scroll-dot {
      animation: none;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }
</style>