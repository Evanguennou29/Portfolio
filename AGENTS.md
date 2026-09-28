# AGENTS.md : regles du depot

## Git (non negociable)
- Evan Guennou est le seul auteur et le seul contributeur de ce depot.
- Aucun trailer "Co-authored-by", aucune mention de Codex, Claude, ChatGPT ou d'un outil IA
  dans les commits, les PR, le README, le code ou les commentaires.
- Ne jamais modifier la config git (user.name, user.email). Commits courts, en anglais,
  style Conventional Commits (feat:, fix:, chore:, docs:, style:, perf:).
- Un commit par lot termine, apres `npm run check && npm run build` au vert.

## Texte visible par l'utilisateur
- Aucun tiret bas ni tiret long (le caractere em dash ou en dash) dans les textes affiches.
  Utiliser des virgules, deux points ou des parentheses.
- Ton sobre et modeste : pas de "je maitrise", pas de superlatifs, pas de chiffres inventes.
- Tout le contenu vient de content/data.json. Ne rien inventer. Si une info manque,
  laisser le champ TODO et l'afficher proprement (ou masquer le bloc), jamais de lorem ipsum.

## Confidentialite
- Aucun nom interne, nom de collegue, nom d'outil interne, chiffre ou capture issus de Thales
  ou de CANAL+. Ces experiences sont decrites uniquement avec les textes de data.json.

## Technique
- Astro (derniere version stable) + TypeScript strict + CSS sur mesure. Pas de Tailwind,
  pas de kit UI (Bootstrap, MUI, shadcn), pas de Streamlit, pas de jQuery.
- JS client minimal : iles Astro uniquement la ou il y a de l'interaction.
- Respecter prefers-reduced-motion et prefers-color-scheme.
- Code et commentaires en anglais. Interface bilingue FR (par defaut) et EN.
- La source de verite du design et du perimetre est docs/SPEC.md. En cas de doute, la suivre.