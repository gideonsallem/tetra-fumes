<script lang="ts">
  import { reveal } from '$lib/actions/reveal';
  import { collection } from '$lib/content';
</script>

<section id="collection" class="section">
  <div class="container">
    <header class="head">
      <p class="eyebrow" use:reveal>{collection.eyebrow}</p>
      <h2 use:reveal={{ delay: 120 }}>{collection.title}</h2>
    </header>

    <div class="grid">
      {#each collection.items as item, i (item.no)}
        <article class="card" use:reveal={{ delay: i * 120 }}>
          <a
            class="card-link"
            href="#collection"
            aria-label={`${item.name}, ${item.mood}`}
          >
            <div class="media">
              <img
                src={item.image}
                alt={`${item.name} fragrance bottle`}
                loading="lazy"
                decoding="async"
                width="800"
                height="1000"
              />
              <span class="badge" aria-hidden="true">{item.no}</span>
            </div>
            <div class="body">
              <div class="title-row">
                <h3>{item.name}</h3>
                <span class="mood">{item.mood}</span>
              </div>
              <ul class="notes">
                {#each item.notes as note (note)}
                  <li>{note}</li>
                {/each}
              </ul>
            </div>
          </a>
        </article>
      {/each}
    </div>
  </div>
</section>

<style>
  .head {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-width: 42rem;
  }
  h2 {
    max-width: 18ch;
  }

  .grid {
    margin-top: clamp(3rem, 8vw, 6rem);
    display: grid;
    grid-template-columns: 1fr;
    gap: clamp(1.5rem, 4vw, 2.5rem);
  }

  .card-link {
    display: block;
    height: 100%;
  }

  .media {
    position: relative;
    aspect-ratio: 4 / 5;
    overflow: hidden;
    background: var(--charcoal);
    border: 1px solid var(--line);
  }
  .media img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform var(--t-slow) var(--ease), filter var(--t-slow) var(--ease);
    filter: saturate(0.9);
  }
  .card-link:hover .media img {
    transform: scale(1.05);
    filter: saturate(1.05);
  }

  .badge {
    position: absolute;
    top: 1rem;
    left: 1rem;
    font-family: 'Space Mono', monospace;
    font-size: 0.7rem;
    letter-spacing: 0.22em;
    color: var(--bone);
    padding: 0.35rem 0.6rem;
    border: 1px solid var(--line-strong);
    background: color-mix(in srgb, var(--obsidian) 45%, transparent);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
  }

  .body {
    padding-top: 1.25rem;
  }

  .title-row {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 1rem;
    padding-bottom: 0.9rem;
    border-bottom: 1px solid var(--line);
  }

  h3 {
    font-size: clamp(1.1rem, 1.8vw, 1.35rem);
  }

  .mood {
    font-family: 'Space Mono', monospace;
    font-size: 0.62rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--ash);
    text-align: right;
  }

  .notes {
    margin-top: 1rem;
    display: block;
  }
  .notes li {
    display: inline;
    font-size: 0.82rem;
    color: var(--ash);
  }
  .notes li:not(:last-child)::after {
    content: ' · ';
    color: var(--line-strong);
    margin-inline: 0.15rem;
  }

  @media (min-width: 600px) {
    .grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  @media (min-width: 1000px) {
    .grid {
      grid-template-columns: repeat(4, 1fr);
    }
  }
</style>