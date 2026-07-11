import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://yashagrawal.me/sitemap.xml",
    host: "https://yashagrawal.me",
  };
}
