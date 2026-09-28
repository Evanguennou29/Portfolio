import { defineConfig } from "astro/config";

const repository = process.env.GITHUB_REPOSITORY;
const [owner, name] = repository?.split("/") ?? [];
const isUserSite =
  owner && name && name.toLowerCase() === `${owner.toLowerCase()}.github.io`;

export default defineConfig({
  site: owner
    ? `https://${owner}.github.io`
    : "https://evanguennou29.github.io",
  base: owner && name && !isUserSite ? `/${name}` : "/",
});
