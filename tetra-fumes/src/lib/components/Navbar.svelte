<script lang="ts">
  import { brand, nav, agency } from '$lib/content';
  import Logo from '$lib/components/Logo.svelte';

  let scrolled = $state(false);
  let mobileOpen = $state(false);
  let activeHref = $state<string | null>(null);

  let burgerEl: HTMLButtonElement | null = $state(null);
  let rafId: number | null = null;

  function computeActive() {
    if (typeof document === 'undefined') return;

    const line = window.innerHeight * 0.4;

    let found: string | null = null;
    for (const link of nav) {
      if (!link.href.startsWith('#')) continue;
      const id = link.href.slice(1);
      const el = document.getElementById(id);
      if (!el) continue;
      const rect = el.getBoundingClientRect();
      if (rect.top <= line && rect.bottom > line) {
        found = link.href;
        break;
      }
    }

    activeHref = found;
  }

  function onScroll() {
    scrolled = window.scrollY > 40;
    if (rafId !== null) return;
    rafId = window.requestAnimationFrame(() => {
      rafId = null;
      computeActive();
    });
  }

  function onResize() {
    if (rafId !== null) return;
    rafId = window.requestAnimationFrame(() => {
      rafId = null;
      computeActive();
    });
  }

  /* Scroll listener: scrolled state + active section */
  $effect(() => {
    if (typeof window === 'undefined') return;

    onScroll();

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
        rafId = null;
      }
    };
  });

  /* Mobile overlay: lock scroll + Escape */
  $effect(() => {
    if (typeof document === 'undefined') return;
    if (!mobileOpen) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeMobile();
      }
    };
    document.addEventListener('keydown', onKey);

    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener('keydown', onKey);
    };
  });

  function toggleMobile() {
    mobileOpen = !mobileOpen;
  }

  function closeMobile() {
    if (!mobileOpen) return;
    mobileOpen = false;
    queueMicrotask(() => burgerEl?.focus());
  }

  function onNavClick() {
    closeMobile();
  }
</script>

<header class="nav" class:scrolled>
  <div class="nav-inner">
    <div class="nav-left">
      <Logo size="sm" />
    </div>

    <nav class="nav-center" aria-label="Primary">
      {#each nav as link (link.href)}
        <a
          href={link.href}
          class:active={activeHref === link.href}
          aria-current={activeHref === link.href ? 'true' : undefined}
        >
          {link.label}
        </a>
      {/each}
    </nav>

    <div class="nav-right">
      <a class="btn-ghost nav-cta" href={agency.url}>Work with us</a>

      <button
        type="button"
        bind:this={burgerEl}
        class="burger"
        class:open={mobileOpen}
        onclick={toggleMobile}
        aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={mobileOpen}
        aria-controls="mobile-menu"
      >
        <span class="burger-line"></span>
        <span class="burger-line"></span>
      </button>
    </div>
  </div>
</header>

<div
  id="mobile-menu"
  class="mobile"
  class:open={mobileOpen}
  aria-hidden={!mobileOpen}
  inert={!mobileOpen ? true : undefined}
>
  <nav class="mobile-nav" aria-label="Mobile primary">
    {#each nav as link, i (link.href)}
      <a
        href={link.href}
        onclick={onNavClick}
        style={`--i:${i}`}
        aria-current={activeHref === link.href ? 'true' : undefined}
      >
        {link.label}
      </a>
    {/each}
  </nav>

  <div class="mobile-foot">
    <a class="btn-ghost" href={agency.url} onclick={onNavClick}>Work with us</a>
    <span class="mobile-brand">{brand.name} · {brand.sub}</span>
  </div>
</div>

<style>
  .nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 72px;
    z-index: 50;
    background: transparent;
    border-bottom: 1px solid transparent;
    transition:
      background-color var(--t-fast) var(--ease),
      border-color var(--t-fast) var(--ease),
      backdrop-filter var(--t-fast) var(--ease);
  }

  .nav.scrolled {
    background-color: rgba(11, 10, 9, 0.72);
    backdrop-filter: blur(14px) saturate(120%);
    -webkit-backdrop-filter: blur(14px) saturate(120%);
    border-bottom-color: var(--line);
  }

  .nav-inner {
    height: 100%;
    max-width: 1280px;
    margin-inline: auto;
    padding-inline: clamp(1.25rem, 5vw, 4rem);
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    align-items: center;
    gap: 1rem;
  }

  .nav-left {
    display: flex;
    justify-content: flex-start;
  }
  .nav-center {
    display: none;
    justify-content: center;
    align-items: center;
    gap: 2.25rem;
  }
  .nav-right {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 0.75rem;
  }

  .nav-center a {
    position: relative;
    font-family: 'DM Sans', ui-sans-serif, system-ui, sans-serif;
    font-size: 0.8rem;
    font-weight: 400;
    text-transform: uppercase;
    letter-spacing: 0.16em;
    color: var(--bone);
    padding-block: 0.5rem;
    transition: color var(--t-fast) var(--ease);
  }
  .nav-center a::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0.1rem;
    width: 100%;
    height: 1px;
    background: var(--amber);
    transform: scaleX(0);
    transform-origin: left center;
    transition: transform var(--t-fast) var(--ease);
  }
  .nav-center a:hover::after {
    transform: scaleX(1);
  }
  .nav-center a.active {
    color: var(--amber);
  }
  .nav-center a.active::after {
    transform: scaleX(1);
  }

  .nav-cta {
    display: none;
    padding: 0.6rem 1rem;
    font-size: 0.68rem;
  }

  .burger {
    width: 40px;
    height: 40px;
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 7px;
    background: transparent;
    border: 1px solid var(--line-strong);
    cursor: pointer;
    transition: border-color var(--t-fast) var(--ease);
  }
  .burger:hover {
    border-color: var(--amber);
  }
  .burger-line {
    display: block;
    width: 18px;
    height: 1px;
    background: var(--bone);
    transition: transform var(--t-fast) var(--ease);
  }
  .burger.open .burger-line:first-child {
    transform: translateY(4px) rotate(45deg);
  }
  .burger.open .burger-line:last-child {
    transform: translateY(-4px) rotate(-45deg);
  }

  .mobile {
    position: fixed;
    inset: 0;
    z-index: 40;
    background-color: rgba(11, 10, 9, 0.96);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 6.5rem clamp(1.25rem, 5vw, 4rem) 2.5rem;
    opacity: 0;
    pointer-events: none;
    transition:
      opacity var(--t-slow) var(--ease),
      visibility 0s linear var(--t-slow);
    visibility: hidden;
  }
  .mobile.open {
    opacity: 1;
    pointer-events: auto;
    visibility: visible;
    transition:
      opacity var(--t-slow) var(--ease),
      visibility 0s;
  }

  .mobile-nav {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  .mobile-nav a {
    display: block;
    padding-block: 0.85rem;
    font-family: 'Syne', ui-sans-serif, system-ui, sans-serif;
    font-weight: 600;
    font-size: clamp(2rem, 9vw, 3.25rem);
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--bone);
    border-bottom: 1px solid var(--line);
    transition: color var(--t-fast) var(--ease);
    opacity: 0;
    transform: translateY(14px);
  }
  .mobile.open .mobile-nav a {
    animation: riseIn 0.7s var(--ease) forwards;
    animation-delay: calc(0.12s * var(--i) + 0.15s);
  }
  .mobile-nav a:hover,
  .mobile-nav a[aria-current='true'] {
    color: var(--amber);
  }

  @keyframes riseIn {
    to {
      opacity: 1;
      transform: none;
    }
  }

  .mobile-foot {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1.5rem;
    padding-top: 1rem;
  }
  .mobile-brand {
    font-family: 'Space Mono', ui-monospace, monospace;
    font-size: 0.62rem;
    letter-spacing: 0.28em;
    text-transform: uppercase;
    color: var(--ash);
  }

  @media (min-width: 860px) {
    .nav-center {
      display: flex;
    }
    .nav-cta {
      display: inline-flex;
    }
    .burger {
      display: none;
    }
    .mobile {
      display: none;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .mobile,
    .mobile.open,
    .mobile.open .mobile-nav a {
      transition: none;
      animation: none;
    }
    .mobile.open .mobile-nav a {
      opacity: 1;
      transform: none;
    }
    .burger-line {
      transition: none;
    }
  }
</style>