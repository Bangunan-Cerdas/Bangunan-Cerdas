// app/robots.ts
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const DOMAIN = "https://bangunan-cerdas.netlify.app";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: `${DOMAIN}/sitemap.xml`,
  };
}
