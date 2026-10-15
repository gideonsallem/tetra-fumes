<script lang="ts">
  import { reveal } from '$lib/actions/reveal';
  import { project, agency } from '$lib/content';

  const mailtoHref = `mailto:${agency.email}`;
</script>

<section id="project" class="section">
  <div class="container grid">
    <div class="left">
      <p class="eyebrow" use:reveal>{project.eyebrow}</p>
      <h2 use:reveal={{ delay: 120 }}>{project.title}</h2>
      <p class="body" use:reveal={{ delay: 240 }}>{project.body}</p>

      <dl class="facts" use:reveal={{ delay: 360 }}>
        {#each project.facts as fact (fact.k)}
          <div class="fact">
            <dt>{fact.k}</dt>
            <dd>{fact.v}</dd>
          </div>
        {/each}
      </dl>
    </div>

    <aside class="card" use:reveal={{ delay: 200 }}>
      <p class="card-label">Designed &amp; built by</p>
      <p class="card-name">{agency.name}</p>
      <p class="card-line">
        Websites, apps and brand experiences for businesses that want to be remembered.
      </p>
      <a class="btn" href={mailtoHref}>{project.cta.label}</a>
    </aside>
  </div>
</section>

<style>
  .section {
    border-top: 1px solid var(--line);
  }

  .grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: clamp(2.5rem, 6vw, 5rem);
    align-items: start;
  }

  /* ---------- Left column ---------- */
  .left {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-width: 42rem;
  }

  h2 {
    max-width: 18ch;
  }

  .body {
    margin: 0.5rem 0 0 0;
    font-family: 'DM Sans', ui-sans-serif, system-ui, sans-serif;
    font-weight: 300;
    font-size: 1rem;
    line-height: 1.8;
    color: rgba(237, 231, 221, 0.8);
    max-width: 52ch;
  }

  .facts {
    margin: 1.5rem 0 0 0;
    display: flex;
    flex-direction: column;
    border-top: 1px solid var(--line);
  }

  .fact {
    display: grid;
    grid-template-columns: minmax(6rem, 1fr) 2fr;
    gap: 1rem;
    align-items: baseline;
    padding-block: 1.1rem;
    border-bottom: 1px solid var(--line);
  }

  dt {
    font-family: 'Space Mono', ui-monospace, monospace;
    font-size: 0.68rem;
    letter-spacing: 0.24em;
    text-transform: uppercase;
    color: var(--ash);
  }
  dd {
    margin: 0;
    font-family: 'DM Sans', ui-sans-serif, system-ui, sans-serif;
    color: var(--bone);
  }

  /* ---------- Right column (card) ---------- */
  .card {
    background-color: var(--charcoal);
    border: 1px solid var(--line);
    padding: clamp(1.5rem, 4vw, 3rem);
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-self: start;
  }

  .card-label {
    font-family: 'Space Mono', ui-monospace, monospace;
    font-size: 0.68rem;
    letter-spacing: 0.24em;
    text-transform: uppercase;
    color: var(--ash);
    margin: 0;
  }

  .card-name {
    margin: 0;
    font-family: 'Syne', ui-sans-serif, system-ui, sans-serif;
    font-weight: 700;
    text-transform: uppercase;
    font-size: clamp(1.6rem, 3.5vw, 2.6rem);
    letter-spacing: 0.08em;
    line-height: 1.05;
    color: var(--bone);
  }

  .card-line {
    margin: 0;
    font-family: 'DM Sans', ui-sans-serif, system-ui, sans-serif;
    font-weight: 300;
    color: rgba(237, 231, 221, 0.75);
    line-height: 1.7;
    max-width: 34ch;
  }

  .card :global(.btn) {
    align-self: flex-start;
    margin-top: 0.75rem;
  }

  @media (min-width: 900px) {
    .grid {
      grid-template-columns: minmax(0, 6fr) minmax(0, 5fr);
      gap: clamp(3rem, 6vw, 6rem);
    }
  }
</style>