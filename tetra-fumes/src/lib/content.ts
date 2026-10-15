/* ============================================================
   TETRA FUMES — all site copy lives here.
   ============================================================ */

export interface NavLink {
  label: string;
  href: string;
}

export interface Brand {
  name: string;
  sub: string;
  tagline: string;
}

export interface Agency {
  name: string;
  url: string;
  email: string;
}

export interface Hero {
  eyebrow: string;
  title: string;
  sub: string;
  primary: NavLink;
  secondary: NavLink;
}

export type FaceKey = "top" | "heart" | "base" | "trail";

export interface FaceItem {
  key: FaceKey;
  label: string;
  line: string;
  notes: string[];
}

export interface Faces {
  eyebrow: string;
  title: string;
  items: FaceItem[];
}

export interface CollectionItem {
  no: string;
  name: string;
  mood: string;
  notes: string[];
  image: string;
}

export interface Collection {
  eyebrow: string;
  title: string;
  items: CollectionItem[];
}

export interface Story {
  eyebrow: string;
  title: string;
  body: string[];
  image: string;
}

export interface Cta {
  title: string;
  label: string;
  href: string;
  image: string;
}

export interface ProjectFact {
  k: string;
  v: string;
}

export interface Project {
  eyebrow: string;
  title: string;
  body: string;
  facts: ProjectFact[];
  cta: NavLink;
}

export interface Footer {
  links: NavLink[];
  socials: NavLink[];
  note: string;
}

export const brand: Brand = {
  name: "TETRA",
  sub: "FUMES",
  tagline: "Four notes. One presence.",
};

export const agency: Agency = {
  name: "Novabuild Studios",
  url: "#project",
  email: "novabuildstudios@gmail.com",
};

export const nav: NavLink[] = [
  { label: "Four Faces", href: "#faces" },
  { label: "Collection", href: "#collection" },
  { label: "Story", href: "#story" },
];

export const hero: Hero = {
  eyebrow: "Small-batch fragrance house",
  title: "Four notes. One presence.",
  sub: "Small-batch fragrances, built like a shape. Top, heart, base, and the trail you leave behind.",
  primary: { label: "Explore the collection", href: "#collection" },
  secondary: { label: "Our story", href: "#story" },
};

export const faces: Faces = {
  eyebrow: "The structure",
  title: "Every scent has four faces.",
  items: [
    {
      key: "top",
      label: "Top",
      line: "The first breath.",
      notes: ["Bergamot", "Saffron", "Pink pepper"],
    },
    {
      key: "heart",
      label: "Heart",
      line: "What stays.",
      notes: ["Rose", "Jasmine", "Iris"],
    },
    {
      key: "base",
      label: "Base",
      line: "What lingers.",
      notes: ["Amber", "Oud", "Sandalwood"],
    },
    {
      key: "trail",
      label: "Trail",
      line: "What you leave behind.",
      notes: ["Musk", "Smoke", "Vanilla"],
    },
  ],
};

export const collection: Collection = {
  eyebrow: "The collection",
  title: "Choose your shape.",
  items: [
    {
      no: "01",
      name: "Ash",
      mood: "Smoky and dry",
      notes: ["Vetiver", "Cedar", "Black pepper", "Birch"],
      image: "/images/ash.webp",
    },
    {
      no: "02",
      name: "Ember",
      mood: "Warm and deep",
      notes: ["Amber", "Oud", "Saffron", "Tonka"],
      image: "/images/ember.webp",
    },
    {
      no: "03",
      name: "Vapour",
      mood: "Fresh and clean",
      notes: ["Bergamot", "White tea", "Sea salt", "Musk"],
      image: "/images/vapour.webp",
    },
    {
      no: "04",
      name: "Veil",
      mood: "Soft and floral",
      notes: ["Jasmine", "Iris", "Sandalwood", "Vanilla"],
      image: "/images/veil.webp",
    },
  ],
};

export const story: Story = {
  eyebrow: "Our story",
  title: "The simplest solid.",
  body: [
    "Tetra means four, and a tetrahedron is the simplest solid there is: four faces, nothing wasted.",
    "We built our fragrances the same way. Four honest layers, blended in small batches, made to be noticed without ever shouting.",
  ],
  image: "/images/story.webp",
};

export const cta: Cta = {
  title: "Leave something behind.",
  label: "Discover your scent",
  href: "#collection",
  image: "/images/cta-bg.png",
};

export const project: Project = {
  eyebrow: "About this project",
  title: "A concept brand site.",
  body: "Tetra Fumes is a fictional fragrance brand, designed and built end to end as a showcase of what we create for brands and businesses.",
  facts: [
    { k: "Type", v: "Brand website" },
    { k: "Scope", v: "Design, motion, development" },
    { k: "Stack", v: "SvelteKit" },
  ],
  cta: { label: "Start your project", href: "novabuildstudios@gmail.com" },
};

export const footer: Footer = {
  links: nav,
  socials: [
    { label: "Instagram", href: "#" },
    { label: "X", href: "#" },
    { label: "TikTok", href: "#" },
  ],
  note: "A concept project. Not a real store.",
};
