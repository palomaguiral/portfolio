// Non-text configuration (links, images, layout tweaks). All copy lives in src/messages/*.json.

export const productSlugs = ["obrik", "riset", "vango"] as const;
export type ProductSlug = (typeof productSlugs)[number];

export type Shot = {
  src: string;
  w: number;
  h: number;
  fit: "cover" | "contain";
  radius: number;
  border?: string;
  bg: string;
  rot: number;
};

export const products: Record<
  ProductSlug,
  {
    links: string[];
    card: { src: string; fit: "cover" | "contain"; pos: string; bg: string; rot: number };
    folder: { src: string; fit: "cover" | "contain"; pos: string; bg?: string };
    shots: Shot[];
  }
> = {
  obrik: {
    links: ["https://www.obrik.net/", "https://apps.apple.com/es/app/obrik/id6773888643"],
    card: { src: "/obrik_web.png", fit: "contain", pos: "50% 50%", bg: "#FFFFFF", rot: -6 },
    folder: { src: "/obrik_obras.png", fit: "cover", pos: "50% 0%" },
    shots: [
      { src: "/obrik_obras.png", w: 150, h: 300, fit: "cover", radius: 24, border: "6px solid #2A1A1A", bg: "#FFFFFF", rot: -3 },
      { src: "/obrik_menu.png", w: 150, h: 300, fit: "cover", radius: 24, border: "6px solid #2A1A1A", bg: "#FFFFFF", rot: 2 },
      { src: "/obrik_web.png", w: 380, h: 254, fit: "contain", radius: 14, bg: "#FFFFFF", rot: -1 },
    ],
  },
  riset: {
    links: ["https://risetstudio.app", "https://apps.apple.com/us/app/riset-una-pregunta-al-d%C3%ADa/id6797267229"],
    card: { src: "/riset_home.png", fit: "contain", pos: "50% 50%", bg: "#FFFFFF", rot: 3 },
    folder: { src: "/riset_home.png", fit: "contain", pos: "50% 50%", bg: "#FFFFFF" },
    shots: [{ src: "/riset_home.png", w: 360, h: 450, fit: "contain", radius: 18, bg: "#FFFFFF", rot: 0 }],
  },
  vango: {
    links: ["https://vango-app.carrd.co/", "https://play.google.com/store/apps/details?id=com.vango.app&pcampaignid=web_share"],
    card: { src: "/vango_1.jpg", fit: "cover", pos: "50% 30%", bg: "#D9C7B4", rot: 7 },
    folder: { src: "/vango_1.jpg", fit: "cover", pos: "50% 20%" },
    shots: [
      { src: "/vango_1.jpg", w: 220, h: 391, fit: "cover", radius: 16, bg: "#D9C7B4", rot: -2 },
      { src: "/vango_2.jpg", w: 220, h: 391, fit: "cover", radius: 16, bg: "#D9C7B4", rot: 2 },
    ],
  },
};

export const productLinks: Record<ProductSlug, string> = {
  obrik: "https://www.obrik.net/",
  riset: "https://risetstudio.app",
  vango: "https://play.google.com/store/apps/details?id=com.vango.app&pcampaignid=web_share",
};

export const analyses = [
  { links: ["/TFM-Paloma-Guiral-Ortuno.pdf"], fig: "/tfm_grafico.png" },
  { links: ["https://lnkd.in/p/e5P772dq"], fig: "/futbol_tabla.png" },
  { links: ["https://lnkd.in/p/eKbbNETa", "https://lnkd.in/p/eKM_5YC5"], fig: "/dana_caudal.png" },
];

export const degreeRotations = [-2, 1.5, -1];
