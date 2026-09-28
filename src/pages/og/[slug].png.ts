import sharp from "sharp";
import data from "../../../content/data.json";
import { getSeoPages, type Locale } from "../../lib/seo";

interface OgProps {
  title: string;
  description: string;
  lang: Locale;
  location: string;
}

export const prerender = true;

const escapeXml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");

function wrapText(value: string, maxLength: number) {
  const words = value.split(/\s+/);
  const lines: string[] = [];
  let line = "";

  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (candidate.length > maxLength && line) {
      lines.push(line);
      line = word;
    } else {
      line = candidate;
    }
  }
  if (line) lines.push(line);
  return lines;
}

function createSvg(props: OgProps) {
  const { title, description, lang } = props;
  const titleLines = wrapText(title, 27).slice(0, 3);
  const descriptionLines = wrapText(description, 54).slice(0, 2);
  const titleMarkup = titleLines
    .map(
      (line, index) =>
        `<text x="82" y="${250 + index * 82}" class="title">${escapeXml(line)}</text>`,
    )
    .join("");
  const descriptionMarkup = descriptionLines
    .map(
      (line, index) =>
        `<text x="86" y="${440 + index * 34}" class="description">${escapeXml(line)}</text>`,
    )
    .join("");
  const indexLabel =
    lang === "fr" ? "PORTFOLIO PERSONNEL" : "PERSONAL PORTFOLIO";
  const coordinate = props.location.toLocaleUpperCase(props.lang);
  const profile = data.person.links.github
    .replace(/^https?:\/\//, "")
    .toUpperCase();

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
    <defs>
      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M40 0H0V40" fill="none" stroke="#232833" stroke-width="1"/>
      </pattern>
      <linearGradient id="fade" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#12151a"/>
        <stop offset="1" stop-color="#0b0d10"/>
      </linearGradient>
    </defs>
    <rect width="1200" height="630" fill="url(#fade)"/>
    <rect width="1200" height="630" fill="url(#grid)" opacity=".45"/>
    <path d="M64 76H1136M64 552H1136" stroke="#232833"/>
    <path d="M850 76V552" stroke="#232833"/>
    <text x="82" y="58" class="label">EVAN GUENNOU / ${indexLabel}</text>
    <text x="1080" y="58" text-anchor="end" class="label">${coordinate}</text>
    ${titleMarkup}
    ${descriptionMarkup}
    <g transform="translate(900 184)">
      <rect width="180" height="180" fill="none" stroke="#4c8dff" stroke-width="2"/>
      <path d="M60 0V180M120 0V180M0 60H180M0 120H180" stroke="#4c8dff" opacity=".4"/>
      <path d="M28 28h32v32H28zM120 120h32v32h-32z" fill="none" stroke="#4c8dff" stroke-width="2"/>
      <circle cx="90" cy="90" r="7" fill="#7cffb2"/>
    </g>
    <text x="82" y="592" class="label">${escapeXml(profile)}</text>
    <style>
      .title{fill:#e8eaed;font:600 66px Arial,sans-serif;letter-spacing:-2px}
      .description{fill:#aeb5c1;font:400 24px Arial,sans-serif}
      .label{fill:#4c8dff;font:500 14px monospace;letter-spacing:2px}
    </style>
  </svg>`;
}

export function getStaticPaths() {
  return getSeoPages().map((page) => ({
    params: { slug: page.image },
    props: {
      title: page.imageTitle,
      description: page.description,
      lang: page.lang,
      location: data.person.location[page.lang],
    },
  }));
}

export async function GET({ props }: { props: OgProps }) {
  const image = await sharp(Buffer.from(createSvg(props)))
    .png()
    .toBuffer();
  return new Response(image, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
