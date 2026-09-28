import { absoluteUrl, getSeoPages } from "../lib/seo";

export const prerender = true;

const escapeXml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");

export function GET() {
  const site = import.meta.env.SITE;
  const base = import.meta.env.BASE_URL;
  if (!site)
    throw new Error("Configure the site URL before building the sitemap");
  const siteUrl = new URL(site);
  const pages = getSeoPages();
  const entries = pages
    .map((page) => {
      const french = escapeXml(absoluteUrl(siteUrl, base, page.frenchPath));
      const english = escapeXml(absoluteUrl(siteUrl, base, page.englishPath));
      const location = escapeXml(absoluteUrl(siteUrl, base, page.path));
      return `<url><loc>${location}</loc><xhtml:link rel="alternate" hreflang="fr" href="${french}"/><xhtml:link rel="alternate" hreflang="en" href="${english}"/><xhtml:link rel="alternate" hreflang="x-default" href="${french}"/></url>`;
    })
    .join("");
  const xml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${entries}</urlset>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
