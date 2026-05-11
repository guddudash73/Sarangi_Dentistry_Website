import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sarangidentistry.in';
  const isStage = baseUrl.includes('stage');

  return {
    rules: {
      userAgent: "*",
      allow: isStage ? undefined : "/",
      disallow: isStage ? "/" : ["/api/"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
