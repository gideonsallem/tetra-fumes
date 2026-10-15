<script lang="ts">
  import { page } from '$app/state';

  const status = $derived(page.status);
  const isServerError = $derived(status >= 500);

  const headline = $derived(isServerError ? 'Something went wrong.' : 'Lost in the smoke.');
  const title = $derived(`${status} — Tetra Fumes`);
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="robots" content="noindex" />
</svelte:head>

<section class="error">
  <svg
    class="deco"
    viewBox="0 0 100 100"
    fill="none"
    stroke="currentColor"
    stroke-width="0.25"
    stroke-linejoin="round"
    stroke-linecap="round"
    aria-hidden="true"
    focusable="false"
  >
    <polygon points="50,8 8,90 92,90" />
    <line x1="50" y1="8" x2="52" y2="52" />
    <line x1="8" y1="90" x2="52" y2="52" />
    <line x1="92" y1="90" x2="52" y2="52" />
  </svg>

  <div class="inner container">
    <p class="eyebrow">Error</p>
    <p class="status" aria-hidden="true">{status}</p>
    <h1>{headline}</h1>
    <p class="lede">That page has drifted away.</p>
    <a class="btn" href="/">Back to Tetra Fumes</a>
  </div>
</section>

<style>
  .error {
    position: relative;
    min-height: 100svh;
    display: grid;
    place-items: center;
    background-color: var(--obsidian);
    color: var(--bone);
    overflow: hidden;
    isolation: isolate;
    padding-block: clamp(4rem, 12vh, 8rem);
  }

  .deco {
    position: absolute;
    top: 50%;
    left: 50%;
    width: min(900px, 120%);
    aspect-ratio: 1 / 1;
    height: auto;
    color: var(--line);
    opacity: 0.5;
    pointer-events: none;
    z-index: 0;
    transform: translate(-50%, -50%);
    transform-origin: center;
    animation: spin 60s linear infinite;
  }

  @keyframes spin {
    from {
      transform: translate(-50%, -50%) rotate(0deg);
    }
    to {
      transform: translate(-50%, -50%) rotate(360deg);
    }
  }

  .inner {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 1rem;
    max-width: 42rem;
  }

  .status {
    font-family: 'Syne', ui-sans-serif, system-ui, sans-serif;
    font-weight: 700;
    font-size: clamp(4.5rem, 16vw, 10rem);
    line-height: 1;
    letter-spacing: 0.04em;
    color: transparent;
    -webkit-text-stroke: 1px var(--line-strong);
    text-stroke: 1px var(--line-strong);
    margin: 0;
  }

  h1 {
    font-family: 'Syne', ui-sans-serif, system-ui, sans-serif;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    font-size: clamp(1.4rem, 3.2vw, 2.2rem);
    line-height: 1.1;
    margin: 0;
    color: var(--bone);
  }

  .lede {
    color: var(--ash);
    font-family: 'DM Sans', ui-sans-serif, system-ui, sans-serif;
    font-weight: 300;
    line-height: 1.7;
    max-width: 34ch;
    margin: 0 0 1.25rem 0;
  }

  @media (prefers-reduced-motion: reduce) {
    .deco {
      animation: none;
    }
  }
</style>