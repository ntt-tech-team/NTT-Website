import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "NTT — Neuro Tech Titans",
    short_name: "NTT",
    description:
      "The official platform for Neuro Tech Titans, SRMIST Trichy",
    start_url: "/",
    display: "standalone",
    orientation: "portrait",
    theme_color: "#7C6EFF",
    background_color: "#08081A",
    icons: [
      {
        src: "/icons/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    categories: ["education", "technology"],
    screenshots: [],
  };
}
