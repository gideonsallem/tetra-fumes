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

  <div class="content container">
    <h2 use:reveal>{cta.title}</h2>
    <div class="actions" use:reveal={{ delay: 150 }}>
      <a class="btn" href={cta.href}>{cta.label}</a>
    </div>
  </div>
</section>

<style>
  .cta {
    position: relative;
    isolation: isolate;
    overflow: hidden;
    padding-block: clamp(6rem, 16vw, 12rem);
    text-align: center;
    border-top: 1px solid var(--line);
    border-bottom: 1px solid var(--line);
  }

  .bg {
    position: absolute;
    inset: 0;
    z-index: -1;
    background: var(--charcoal);
  }
  .bg img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.35;
    filter: saturate(0.55) contrast(1.05);
  }
  .bg::after {
    content: '';
    position: absolute;
    inset: 0;
    background:
      radial-gradient(
        60% 80% at 50% 50%,
        transparent 30%,
        color-mix(in srgb, var(--obsidian) 85%, transparent) 100%
      ),
      linear-gradient(
        180deg,
        color-mix(in srgb, var(--obsidian) 45%, transparent),
        color-mix(in srgb, var(--obsidian) 80%, transparent)
      );
  }

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
  }
  h2 {
    max-width: 16ch;
  }
  .actions {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.85rem;
  }
</style>