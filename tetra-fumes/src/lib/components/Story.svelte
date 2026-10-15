<script lang="ts">
  import { reveal } from '$lib/actions/reveal';
  import { story } from '$lib/content';
</script>

<section id="story" class="section">
  <div class="container grid">
    <figure class="media" use:reveal>
      <div class="frame" aria-hidden="true"></div>
      <div class="media-inner">
        <img
          src={story.image}
          alt="Smoke, amber resin and rose petal on dark stone"
          loading="lazy"
          decoding="async"
          width="1200"
          height="1500"
        />
      </div>
    </figure>

    <div class="body">
      <p class="eyebrow" use:reveal={{ delay: 120 }}>{story.eyebrow}</p>
      <h2 use:reveal={{ delay: 240 }}>{story.title}</h2>

      {#each story.body as para, i (para)}
        <p class="para" use:reveal={{ delay: 360 + i * 120 }}>{para}</p>
      {/each}

      <svg
        class="tetra"
        viewBox="0 0 32 32"
        fill="none"
        stroke="currentColor"
        stroke-width="1"
        stroke-linejoin="round"
        stroke-linecap="round"
        aria-hidden="true"
        focusable="false"
        use:reveal={{ delay: 720 }}
      >
        <polygon points="16,4 4,28 28,28" />
        <line x1="16" y1="4" x2="20" y2="18" />
        <line x1="28" y1="28" x2="20" y2="18" />
      </svg>
    </div>
  </div>
</section>

<style>
  .grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: clamp(2rem, 6vw, 4rem);
    align-items: center;
  }

  /* ---------- Media ---------- */
  .media {
    position: relative;
    margin: 0;
    z-index: 0;
  }

  .media-inner {
    position: relative;
    aspect-ratio: 3 / 2;
    overflow: hidden;
    background: var(--charcoal);
    border: 0;
    z-index: 1;
  }

  .media-inner img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: saturate(0.9) contrast(1.02);
    transform: scale(1.08);
    transition: transform 1.6s var(--ease);
  }

  .media.reveal.in .media-inner img,
  .media:not(.reveal) .media-inner img {
    transform: scale(1);
  }

  .frame {
    position: absolute;
    inset: 0;
    transform: translate(-16px, 16px);
    border: 1px solid var(--line-strong);
    z-index: 0;
    pointer-events: none;
  }

  /* ---------- Body ---------- */
  .body {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  h2 {
    max-width: 16ch;
    margin-bottom: 0.5rem;
  }

  .para {
    font-family: 'DM Sans', ui-sans-serif, system-ui, sans-serif;
    font-weight: 300;
    font-size: 1rem;
    line-height: 1.8;
    color: rgba(237, 231, 221, 0.8);
    max-width: 34rem;
    margin: 0;
  }

  .tetra {
    margin-top: 1rem;
    width: 32px;
    height: 32px;
    color: var(--amber);
  }

  @media (min-width: 900px) {
    .grid {
      grid-template-columns: minmax(0, 5fr) minmax(0, 6fr);
      gap: clamp(2rem, 6vw, 6rem);
    }
    .media-inner {
      aspect-ratio: 4 / 5;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .media-inner img {
      transform: scale(1);
      transition: none;
    }
  }
</style>