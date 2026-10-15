<script lang="ts">
  import { brand } from '$lib/content';

  interface Props {
    size?: 'sm' | 'md' | 'lg';
  }

  let { size = 'md' }: Props = $props();
</script>

<a href="#hero" class={`logo logo-${size}`} aria-label={`${brand.name} ${brand.sub} home`}>
  <svg
    class="mark"
    viewBox="0 0 32 32"
    fill="none"
    stroke="currentColor"
    stroke-width="1"
    stroke-linejoin="round"
    stroke-linecap="round"
    aria-hidden="true"
    focusable="false"
  >
    <polygon points="16,4 4,28 28,28" />
    <line x1="16" y1="4" x2="20" y2="18" />
    <line x1="28" y1="28" x2="20" y2="18" />
  </svg>

  <span class="wordmark">
    <span class="name">{brand.name}</span>
    <span class="sub">{brand.sub}</span>
  </span>
</a>

<style>
  .logo {
    display: inline-flex;
    align-items: center;
    gap: 0.65rem;
    color: var(--bone);
    line-height: 1;
    transition: color var(--t-fast) var(--ease);
  }
  .logo:hover {
    color: var(--bone);
  }
  .logo:hover .mark {
    color: var(--amber);
  }

  .mark {
    flex: 0 0 auto;
    display: block;
    color: currentColor;
    transition: color var(--t-fast) var(--ease);
  }

  .wordmark {
    display: inline-flex;
    flex-direction: column;
    gap: 0.28em;
  }

  .name {
    font-family: 'Syne', ui-sans-serif, system-ui, sans-serif;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.2em;
    line-height: 1;
  }

  .sub {
    font-family: 'Space Mono', ui-monospace, monospace;
    font-weight: 400;
    text-transform: uppercase;
    letter-spacing: 0.4em;
    color: var(--ash);
    line-height: 1;
  }

  /* ---- Sizes ---- */
  .logo-sm .mark {
    width: 20px;
    height: 20px;
  }
  .logo-sm .name {
    font-size: 0.85rem;
  }
  .logo-sm .sub {
    font-size: 0.5rem;
  }

  .logo-md .mark {
    width: 26px;
    height: 26px;
  }
  .logo-md .name {
    font-size: 1rem;
  }
  .logo-md .sub {
    font-size: 0.55rem;
  }

  .logo-lg .mark {
    width: 42px;
    height: 42px;
  }
  .logo-lg .name {
    font-size: 1.5rem;
  }
  .logo-lg .sub {
    font-size: 0.68rem;
  }
</style>