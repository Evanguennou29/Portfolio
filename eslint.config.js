import eslint from "@eslint/js";
import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import astro from "eslint-plugin-astro";

export default [
  { ignores: ["dist/**", "node_modules/**", ".astro/**"] },
  eslint.configs.recommended,
  ...astro.configs["flat/recommended"],
  {
    languageOptions: { globals: { process: "readonly" } },
  },
  {
    files: ["**/*.ts"],
    languageOptions: { parser: tsParser },
    plugins: { "@typescript-eslint": tsPlugin },
    rules: { ...tsPlugin.configs.recommended.rules },
  },
];
