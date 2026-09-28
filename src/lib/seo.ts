import data from "../../content/data.json";

export type Locale = "fr" | "en";

type Localized = string | { fr: string; en: string };

export interface SeoPage {
  path: string;
  lang: Locale;
  title: string;
  imageTitle: string;
  description: string;
  image: string;
  frenchPath: string;
  englishPath: string;
}

const localized = (value: Localized, lang: Locale) =>
  typeof value === "string" ? value : value[lang];

const homePages: SeoPage[] = (["fr", "en"] as const).map((lang) => ({
  path: lang === "fr" ? "" : "en/",
  lang,
  title: `${data.person.title[lang]} | ${data.person.name}`,
  imageTitle: data.person.title[lang],
  description: data.person.tagline[lang],
  image: `${lang}-home`,
  frenchPath: "",
  englishPath: "en/",
}));

const projectPages: SeoPage[] = data.projects.flatMap((project) => {
  const title = localized(project.title, "fr");
  const englishTitle = localized(project.title, "en");
  const frenchPath = `projets/${project.slug}/`;
  const englishPath = `en/projects/${project.slug}/`;

  return (["fr", "en"] as const).map((lang) => ({
    path: lang === "fr" ? frenchPath : englishPath,
    lang,
    title: `${lang === "fr" ? title : englishTitle} | ${data.person.name}`,
    imageTitle: lang === "fr" ? title : englishTitle,
    description: localized(project.summary ?? "", lang),
    image: `${lang}-project-${project.slug}`,
    frenchPath,
    englishPath,
  }));
});

export function getSeoPages() {
  return [...homePages, ...projectPages];
}

export const seoPages = getSeoPages();

export function getRouteKey(pathname: string, base: string) {
  const route = pathname.startsWith(base)
    ? pathname.slice(base.length)
    : pathname;
  return route.replace(/^\/+|\/+$/g, "");
}

export function absoluteUrl(site: URL, base: string, path: string) {
  return new URL(`${base}${path}`, site).href;
}
