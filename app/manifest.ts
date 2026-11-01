import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest { return { name: "Pausio.eu", short_name: "Pausio", description: "Lock distractions away. Get your time back.", start_url: "/", display: "standalone", background_color: "#f7f7f2", theme_color: "#315a49", icons: [{ src: "/icon.svg", type: "image/svg+xml", sizes: "any" }] }; }
