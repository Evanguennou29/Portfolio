export const prerender = true;

export function GET() {
  const site = import.meta.env.SITE;
  if (!site)
    throw new Error("Configure the site URL before building robots.txt");
  const sitemap = new URL(`${import.meta.env.BASE_URL}sitemap.xml`, site).href;
  const content = `User-agent: *\nAllow: /\nSitemap: ${sitemap}\n`;

  return new Response(content, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
