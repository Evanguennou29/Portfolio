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
        <circle cx="20" cy="20" r="1" fill="#d3d5e3"/>
      </pattern>
      <linearGradient id="fade" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#ffffff"/>
        <stop offset="1" stop-color="#eef0fa"/>
      </linearGradient>
    </defs>
    <rect width="1200" height="630" fill="url(#fade)"/>
    <rect width="1200" height="630" fill="url(#grid)" opacity=".45"/>
    <path d="M64 76H1136M64 552H1136" stroke="#d3d5e3"/>
    <text x="82" y="58" class="label">EVAN GUENNOU / ${indexLabel}</text>
    <text x="1080" y="58" text-anchor="end" class="label">${coordinate}</text>
    ${titleMarkup}
    ${descriptionMarkup}
    <g transform="translate(842 212)">
      <path d="M0 144C42 144 48 12 114 12S191 139 285 46" fill="none" stroke="#6452a6" stroke-width="4"/>
      <path d="M0 171C67 171 62 79 151 79S205 194 285 114" fill="none" stroke="#5a82ca" stroke-width="3" opacity=".65"/>
      <circle cx="114" cy="12" r="9" fill="#ffffff" stroke="#6452a6" stroke-width="3"/>
      <circle cx="151" cy="79" r="6" fill="#5a82ca"/>
    </g>
    <text x="82" y="592" class="label">${escapeXml(profile)}</text>
    <style>
      .title{fill:#1b2031;font:600 66px Arial,sans-serif;letter-spacing:-2px}
      .description{fill:#5d657a;font:400 24px Arial,sans-serif}
      .label{fill:#6452a6;font:500 14px monospace;letter-spacing:2px}
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
