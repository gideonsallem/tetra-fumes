<script lang="ts">
  import { agency, footer } from '$lib/content';
  import { reveal } from '$lib/actions/reveal';
  import Logo from '$lib/components/Logo.svelte';

  const year = new Date().getFullYear();
</script>

<footer class="footer">
  <div class="container">
    <div class="top" use:reveal>
      <div class="brand-col">
        <Logo size="lg" />
      </div>

      <nav class="col" aria-label="Explore">
        <h3 class="col-title">Explore</h3>
        <ul>
          {#each footer.links as link (link.href)}
            <li><a href={link.href}>{link.label}</a></li>
          {/each}
        </ul>
      </nav>

      <nav class="col" aria-label="Follow">
        <h3 class="col-title">Follow</h3>
        <ul>
          {#each footer.socials as link (link.label)}
            <li>
              <a href={link.href} rel="noopener noreferrer">{link.label}</a>
            </li>
          {/each}
        </ul>
      </nav>
    </div>

    <div class="giant" aria-hidden="true" use:reveal={{ delay: 120 }}>
      <span>TETRA</span>
    </div>

    <div class="bottom" use:reveal={{ delay: 200 }}>
      <p class="note">{footer.note}</p>
      <p class="credit">
        <span>Designed &amp; built by {agency.name}</span>
        <span class="sep" aria-hidden="true">·</span>
        <span>© {year}</span>
      </p>
    </div>
  </div>
</footer>

<style>
  .footer {
    background-color: var(--charcoal);
    border-top: 1px solid var(--line);
    padding-block: clamp(3rem, 8vw, 5.5rem) clamp(1.5rem, 3vw, 2.25rem);
    overflow: hidden;
  }

  .top {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }

  .col-title {
    font-family: 'Space Mono', ui-monospace, monospace;
    font-size: 0.66rem;
    font-weight: 400;
    letter-spacing: 0.28em;
    text-transform: uppercase;
    color: var(--ash);
    margin-bottom: 1.25rem;
  }

  .col ul {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }
  .col a {
    font-family: 'DM Sans', ui-sans-serif, system-ui, sans-serif;
    font-size: 0.9rem;
    color: var(--bone);
    transition: color var(--t-fast) var(--ease);
  }
  .col a:hover {
    color: var(--amber);
  }

  .giant {
    margin-top: clamp(2rem, 6vw, 4rem);
    text-align: center;
    line-height: 0.8;
    pointer-events: none;
    user-select: none;
  }
  .giant span {
    display: inline-block;
    font-family: 'Syne', ui-sans-serif, system-ui, sans-serif;
    font-weight: 700;
    text-transform: uppercase;
    font-size: clamp(5rem, 22vw, 20rem);
    letter-spacing: 0.02em;
    line-height: 0.8;
    color: transparent;
    -webkit-text-stroke: 1px var(--line);
    text-stroke: 1px var(--line);
  }

  .bottom {
    margin-top: clamp(1.5rem, 4vw, 2.5rem);
    padding-top: 1.75rem;
    border-top: 1px solid var(--line);
    display: flex;
    flex-wrap: wrap;
    gap: 0.9rem 2rem;
    justify-content: space-between;
    align-items: baseline;
    color: var(--ash);
    font-size: 0.8rem;
  }
  .note {
    max-width: 42ch;
  }
  .credit {
    display: inline-flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    align-items: baseline;
    font-family: 'Space Mono', ui-monospace, monospace;
    font-size: 0.68rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
  }
  .sep {
    color: var(--line-strong);
  }

  @media (min-width: 720px) {
    .top {
      grid-template-columns: 2fr 1fr 1fr;
      gap: 3rem;
      align-items: start;
    }
  }
</style>