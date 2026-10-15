<script lang="ts">
  import '../app.css';
  import '$lib/styles/polish.css';
  import Navbar from '$lib/components/Navbar.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import AgencyBadge from '$lib/components/AgencyBadge.svelte';

  // replace with the deployed URL
  const SITE_URL = 'https://tetrafumes.example.com';
  const OG_IMAGE = `${SITE_URL}/images/og.jpg`;

  let { children } = $props();
</script>

<svelte:head>
  <title>Tetra Fumes — Four notes. One presence.</title>
  <meta
    name="description"
    content="Tetra Fumes is a small-batch fragrance house built like a shape: top, heart, base and trail. Four notes. One presence."
  />

  <meta property="og:title" content="Tetra Fumes — Four notes. One presence." />
  <meta
    property="og:description"
    content="Tetra Fumes is a small-batch fragrance house built like a shape: top, heart, base and trail. Four notes. One presence."
  />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="Tetra Fumes" />
  <meta property="og:image" content={OG_IMAGE} />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta
    property="og:image:alt"
    content="Tetra Fumes amber fragrance bottle with rose petals and smoke"
  />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Tetra Fumes — Four notes. One presence." />
  <meta
    name="twitter:description"
    content="Tetra Fumes is a small-batch fragrance house built like a shape: top, heart, base and trail. Four notes. One presence."
  />
  <meta name="twitter:image" content={OG_IMAGE} />
</svelte:head>

<div class="app">
  <a class="skip-link" href="#content">Skip to content</a>
  <Navbar />
  {@render children()}
  <Footer />
  <AgencyBadge />
</div>