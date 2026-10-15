<script lang="ts">
  import { reveal } from '$lib/actions/reveal';
  import { cta } from '$lib/content';
</script>

<section id="cta" class="cta">
  <div class="bg" aria-hidden="true">
    <img
      src={cta.image}
      alt=""
      loading="lazy"
      decoding="async"
      width="1920"
      height="1080"
    />
  </div>
  <div class="overlay overlay-dark" aria-hidden="true"></div>
  <div class="overlay overlay-spot" aria-hidden="true"></div>
  <div class="overlay overlay-fade" aria-hidden="true"></div>

  <div class="content container">
    <p class="eyebrow" use:reveal>Tetra Fumes</p>
    <h2 use:reveal={{ delay: 120 }}>{cta.title}</h2>
    <div class="actions" use:reveal={{ delay: 240 }}>
      <a class="btn" href={cta.href}>{cta.label}</a>
    </div>
  </div>
</section>

<style>
  .cta {
    position: relative;
    min-height: 85svh;
    overflow: hidden;
    display: grid;
    place-items: center;
    text-align: center;
    isolation: isolate;
    background-color: var(--obsidian);
    padding-block: clamp(4rem, 10vh, 8rem);
  }

  .bg {
    position: absolute;
    inset: 0;
    z-index: -1;
  }
  .bg img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: saturate(0.75) contrast(1.05);
    transform-origin: center;
    animation: slowZoom 24s ease-in-out infinite alternate;
    will-change: transform;
  }

  @keyframes slowZoom {
    from {
      transform: scale(1);
    }
    to {
      transform: scale(1.08);
    }
  }

  .overlay {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 0;
  }

  .overlay-dark {
    background: rgba(11, 10, 9, 0.55);
  }

  .overlay-spot {
    background: radial-gradient(
      ellipse 60% 50% at 50% 50%,
      rgba(208, 138, 60, 0.08) 0%,
      rgba(208, 138, 60, 0) 60%
    );
  }

  .overlay-fade {
    background: linear-gradient(
        to bottom,
        var(--obsidian) 0%,
        rgba(11, 10, 9, 0) 18%,
        rgba(11, 10, 9, 0) 82%,
        var(--obsidian) 100%
      );
  }

  .content {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
    max-width: 42rem;
  }

  h2 {
    font-family: 'Syne', ui-sans-serif, system-ui, sans-serif;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    line-height: 1.02;
    font-size: clamp(2.4rem, 7vw, 6rem);
    margin: 0;
    max-width: 18ch;
  }

  .actions {
    margin-top: 0.5rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.85rem;
  }

  @media (prefers-reduced-motion: reduce) {
    .bg img {
      animation: none;
      transform: scale(1);
    }
  }
</style>