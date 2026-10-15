<script lang="ts">
  import { reveal } from '$lib/actions/reveal';
  import { faces, type FaceKey } from '$lib/content';

  let active = $state<FaceKey>('top');

  function setActive(key: FaceKey) {
    active = key;
  }
</script>

<section id="faces" class="section">
  <div class="container">
    <header class="head">
      <p class="eyebrow" use:reveal>{faces.eyebrow}</p>
      <h2 use:reveal={{ delay: 120 }}>{faces.title}</h2>
    </header>

    <div class="stage">
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

      <div class="bottle-wrap" use:reveal={{ delay: 60 }}>
        <div class="glow" aria-hidden="true"></div>
        <img
          class="bottle"
          src="/images/bottle-main.webp"
          alt="Tetra Fumes amber fragrance bottle"
          loading="lazy"
          decoding="async"
          width="800"
          height="1200"
        />
      </div>

      {#each faces.items as item, i (item.key)}
        <div
          class="face-item"
          class:active={active === item.key}
          data-key={item.key}
          use:reveal={{ delay: i * 120 }}
        >
          <button
            type="button"
            class="face-head"
            aria-expanded={active === item.key}
            aria-controls={`face-panel-${item.key}`}
            onpointerenter={() => setActive(item.key)}
            onfocus={() => setActive(item.key)}
            onclick={() => setActive(item.key)}
          >
            <span class="idx">0{i + 1}</span>
            <span class="label">{item.label}<span class="connector" aria-hidden="true"></span></span>
          </button>

          <div
            id={`face-panel-${item.key}`}
            class="details"
            class:open={active === item.key}
          >
            <div class="details-clip">
              <div class="details-inner">
                <p class="face-line">{item.line}</p>
                <ul class="notes">
                  {#each item.notes as note (note)}
                    <li>{note}</li>
                  {/each}
                </ul>
              </div>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  /* ---------- Header ---------- */
  .head {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-width: 44rem;
  }
  h2 {
    max-width: 18ch;
  }

  /* ---------- Stage (mobile-first: single column, normal flow) ---------- */
  .stage {
    position: relative;
    margin-top: clamp(2.5rem, 7vw, 5rem);
    display: grid;
    grid-template-columns: 1fr;
    gap: 0;
    isolation: isolate;
  }

  /* ---------- Decorative tetrahedron ---------- */
  .deco {
    position: absolute;
    top: 50%;
    left: 50%;
    width: min(900px, 100%);
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

  /* ---------- Bottle ---------- */
  .bottle-wrap {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-bottom: 2rem;
  }

  .glow {
    position: absolute;
    inset: -10%;
    background: radial-gradient(
      ellipse at center,
      rgba(208, 138, 60, 0.25) 0%,
      rgba(208, 138, 60, 0.08) 40%,
      transparent 70%
    );
    filter: blur(40px);
    pointer-events: none;
    z-index: 0;
  }

  .bottle {
    position: relative;
    z-index: 1;
    max-height: 55vh;
    max-width: 100%;
    width: auto;
    height: auto;
    object-fit: contain;
    border: 0;
    box-shadow: none;
    background: transparent;
    -webkit-mask-image: radial-gradient(
      ellipse 55% 60% at 50% 50%,
      #000 55%,
      transparent 100%
    );
    mask-image: radial-gradient(
      ellipse 55% 60% at 50% 50%,
      #000 55%,
      transparent 100%
    );
    -webkit-mask-repeat: no-repeat;
    mask-repeat: no-repeat;
    -webkit-mask-size: 100% 100%;
    mask-size: 100% 100%;
    animation: float 7s ease-in-out infinite alternate;
    will-change: transform;
  }

  @keyframes float {
    from {
      transform: translateY(0);
    }
    to {
      transform: translateY(-14px);
    }
  }

  /* ---------- Face items (mobile accordion) ---------- */
  .face-item {
    position: relative;
    z-index: 1;
    border-bottom: 1px solid var(--line);
  }
  .face-item:last-child {
    border-bottom: 0;
  }

  .face-head {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.4rem;
    width: 100%;
    padding: 1.25rem 0;
    background: transparent;
    border: 0;
    color: inherit;
    cursor: pointer;
    text-align: left;
    overflow: visible;
  }

  .idx {
    font-family: 'Space Mono', ui-monospace, monospace;
    font-size: 0.68rem;
    letter-spacing: 0.24em;
    text-transform: uppercase;
    color: var(--ash);
    line-height: 1;
    transition: color var(--t-fast) var(--ease);
  }

  .label {
    position: relative;
    display: inline-block;
    font-family: 'Syne', ui-sans-serif, system-ui, sans-serif;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    font-size: clamp(1.15rem, 2vw, 1.5rem);
    line-height: 1.1;
    color: var(--bone);
    transition: color var(--t-fast) var(--ease);
  }

  .face-head:hover .label,
  .face-head:focus-visible .label,
  .face-item.active .label {
    color: var(--amber);
  }
  .face-item.active .idx {
    color: var(--amber);
  }

  /* ---------- Details (accordion) ---------- */
  .details {
    display: grid;
    grid-template-rows: 0fr;
    transition: grid-template-rows var(--t-slow) var(--ease);
  }
  .details.open {
    grid-template-rows: 1fr;
  }

  .details-clip {
    min-height: 0;
    overflow: hidden;
  }

  .details-inner {
    padding-bottom: 1.5rem;
    opacity: 0;
    transition: opacity var(--t-fast) var(--ease);
  }
  .details.open .details-inner {
    opacity: 1;
    transition-delay: 0.15s;
  }

  .face-line {
    font-family: 'DM Sans', ui-sans-serif, system-ui, sans-serif;
    font-style: italic;
    font-weight: 300;
    color: var(--ash);
    font-size: 0.98rem;
    line-height: 1.5;
    margin: 0 0 1rem 0;
  }

  .notes {
    display: flex;
    flex-wrap: wrap;
    gap: 0.45rem;
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .notes li {
    font-family: 'Space Mono', ui-monospace, monospace;
    font-size: 0.7rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--bone);
    border: 1px solid var(--line);
    padding: 0.4rem 0.7rem;
    line-height: 1;
  }

  /* Connector is desktop-only */
  .connector {
    display: none;
  }

  /* ---------- Desktop layout ---------- */
  @media (min-width: 1000px) {
    .stage {
      grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
      grid-template-rows: auto auto;
      grid-template-areas:
        'top bottle base'
        'heart bottle trail';
      column-gap: clamp(3.5rem, 6vw, 6rem);
      row-gap: 2.5rem;
      align-items: center;
    }

    .bottle-wrap {
      grid-area: bottle;
      margin-bottom: 0;
      min-height: 0;
    }

    .bottle {
      max-height: 70vh;
    }

    .face-item[data-key='top'] {
      grid-area: top;
    }
    .face-item[data-key='heart'] {
      grid-area: heart;
    }
    .face-item[data-key='base'] {
      grid-area: base;
    }
    .face-item[data-key='trail'] {
      grid-area: trail;
    }

    .face-item {
      border-bottom: 0;
    }

    .face-head {
      padding: 0;
    }

    /* Left column — right-aligned */
    .face-item[data-key='top'] .face-head,
    .face-item[data-key='heart'] .face-head {
      align-items: flex-end;
      text-align: right;
    }

    .face-item[data-key='top'] .face-line,
    .face-item[data-key='heart'] .face-line {
      text-align: right;
    }

    .face-item[data-key='top'] .notes,
    .face-item[data-key='heart'] .notes {
      justify-content: flex-end;
    }

    /* Connector line — anchored to the label's vertical center */
    .connector {
      display: block;
      position: absolute;
      top: 50%;
      width: 3rem;
      height: 1px;
      background: var(--line-strong);
      transform: translateY(-50%);
      pointer-events: none;
      transition: background-color var(--t-fast) var(--ease);
    }

    .face-item[data-key='top'] .connector,
    .face-item[data-key='heart'] .connector {
      left: 100%;
      margin-left: 1rem;
    }

    .face-item[data-key='base'] .connector,
    .face-item[data-key='trail'] .connector {
      right: 100%;
      margin-right: 1rem;
    }

    /* Amber dot at the end of the connector nearest the bottle */
    .connector::after {
      content: '';
      position: absolute;
      top: 50%;
      width: 6px;
      height: 6px;
      border-radius: 999px;
      background: var(--amber);
      transform: translateY(-50%) scale(0);
      transition: transform var(--t-fast) var(--ease);
    }

    .face-item[data-key='top'] .connector::after,
    .face-item[data-key='heart'] .connector::after {
      right: -3px;
    }

    .face-item[data-key='base'] .connector::after,
    .face-item[data-key='trail'] .connector::after {
      left: -3px;
    }

    .face-item.active .connector::after {
      transform: translateY(-50%) scale(1);
    }
  }

  /* ---------- Reduced motion ---------- */
  @media (prefers-reduced-motion: reduce) {
    .deco,
    .bottle {
      animation: none;
    }
    .details,
    .details-inner,
    .connector::after {
      transition: none;
    }
  }
</style>