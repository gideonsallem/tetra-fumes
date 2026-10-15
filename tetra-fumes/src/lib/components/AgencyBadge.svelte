<script lang="ts">
  import { agency } from '$lib/content';

  let visible = $state(false);
  let mounted = $state(false);

  $effect(() => {
    if (typeof window === 'undefined') return;

    let heroEl: HTMLElement | null = null;
    let projectEl: HTMLElement | null = null;
    let footerEl: HTMLElement | null = null;

    const flags = { hero: false, project: false, footer: false };

    function update() {
      const hide = flags.hero || flags.project || flags.footer;
      visible = !hide;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const t = entry.target as HTMLElement;
          const ratio = entry.intersectionRatio;
          if (t.id === 'hero') {
            flags.hero = ratio >= 0.4;
          } else if (t.id === 'project') {
            flags.project = ratio >= 0.2;
          } else if (t.tagName.toLowerCase() === 'footer') {
            flags.footer = ratio >= 0.2;
          }
        }
        update();
      },
      {
        threshold: [0, 0.2, 0.4, 0.5, 0.6, 0.8, 1]
      }
    );

    function attach() {
      heroEl = document.getElementById('hero');
      projectEl = document.getElementById('project');
      footerEl = document.querySelector('footer');
      if (heroEl) io.observe(heroEl);
      if (projectEl) io.observe(projectEl);
      if (footerEl) io.observe(footerEl);
      update();
    }

    /* Wait a tick so children (footer etc.) are in the DOM */
    const raf = requestAnimationFrame(() => {
      attach();
      window.setTimeout(() => {
        mounted = true;
      }, 1500);
    });

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  });
</script>

<a
  class="badge"
  class:visible={mounted && visible}
  href={agency.url}
  aria-label={`Designed and built by ${agency.name}`}
>
  <span class="dot" aria-hidden="true"></span>
  <span class="label">Designed &amp; built by</span>
  <span class="name">{agency.name}</span>
  <span class="arrow" aria-hidden="true">↗</span>
</a>

<style>
  .badge {
    position: fixed;
    left: clamp(0.75rem, 2vw, 1.5rem);
    bottom: clamp(0.75rem, 2vw, 1.5rem);
    z-index: 40;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.55rem 1rem;
    border-radius: 999px;
    background: rgba(22, 20, 18, 0.78);
    border: 1px solid var(--line-strong);
    backdrop-filter: blur(10px) saturate(120%);
    -webkit-backdrop-filter: blur(10px) saturate(120%);
    font-family: 'DM Sans', ui-sans-serif, system-ui, sans-serif;
    font-size: 0.78rem;
    line-height: 1;
    color: var(--bone);
    text-decoration: none;
    opacity: 0;
    pointer-events: none;
    transform: translateY(6px);
    transition:
      opacity var(--t-slow) var(--ease),
      transform var(--t-slow) var(--ease),
      border-color var(--t-fast) var(--ease);
  }

  .badge.visible {
    opacity: 1;
    pointer-events: auto;
    transform: none;
  }

  .badge:hover {
    border-color: var(--amber);
  }

  .badge:hover .arrow {
    transform: translate(2px, -2px);
    color: var(--amber);
  }

  .dot {
    width: 6px;
    height: 6px;
    border-radius: 999px;
    background: var(--amber);
    flex: 0 0 auto;
  }

  .label {
    font-family: 'Space Mono', ui-monospace, monospace;
    font-size: 0.62rem;
    letter-spacing: 0.24em;
    text-transform: uppercase;
    color: var(--ash);
  }

  .name {
    font-weight: 500;
    color: var(--bone);
    letter-spacing: 0.02em;
  }

  .arrow {
    display: inline-block;
    color: var(--bone);
    transition: transform var(--t-fast) var(--ease), color var(--t-fast) var(--ease);
  }

  @media (max-width: 599px) {
    .label {
      display: none;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .badge {
      transform: none;
      transition: opacity 0.2s linear, border-color var(--t-fast) var(--ease);
    }
    .arrow {
      transition: none;
    }
  }
</style>