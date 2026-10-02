# Portfolio Evan Guennou : direction produit

## Objectif

Présenter un profil Data, AI et Software Engineer avec une lecture rapide pour les recruteurs et une lecture approfondie pour les responsables techniques. Les projets publics précèdent les expériences professionnelles.

## Contenu

`content/data.json` est la source du contenu français et anglais. Les expériences professionnelles utilisent uniquement les informations déjà présentes dans ce fichier. Les projets publics sont présentés dans cet ordre fixe : Syntho Crowd, Sign'iA, Anomaly City, Intelligent Document Processing / IDP, Eco2Mix ELT, LeoChat, DECP Copilot. Syntho Crowd est le projet principal.

Chaque projet contient un contexte, une approche, un résultat concret, des technologies, une page de détail, un lien GitHub et un lien vers la démo ou la présentation. Les informations doivent pouvoir être vérifiées dans les dépôts. Une note précise que les principaux travaux professionnels restent privés pour des raisons de confidentialité.

La section « Au-delà du code » est supprimée. Les titres des sections et les compétences ne comportent aucun numéro décoratif.

## Interface

- Accueil factuel avec nom, métier et carte interactive des sept projets. Aucun slogan ni indicateur de disponibilité.
- Palette bleu gris, violet et bleu lumineux, avec variante sombre respectant la préférence du système.
- Compétences regroupées par domaine en lignes compactes, sans cartes ni pastilles d'outils.
- Trois premiers projets en vignettes carrées, quatre suivants en lignes illustrées par leurs dessins. Chaque projet donne accès au détail et à l'interface ou à la présentation. Les captures sont réservées aux pages de détail.
- Cinq transitions graphiques distinctes relient les sections : nœud de données, convergence, chronologie, orbites et sortie vers le contact. Le parcours utilise deux panneaux contrastés et des repères de dates issus des données.
- Expériences présentées comme un récit chronologique avec contributions dépliables.
- Navigation principale, palette de commandes, thèmes sombre et clair, routes françaises et anglaises.
- Sélecteur de missions : affiche les intitulés des cinq postes, change le texte de présentation, met les compétences et projets pertinents en évidence et choisit le CV. Il conserve l'ordre fixe des projets.

## Motion et accessibilité

Les apparitions au scroll utilisent `IntersectionObserver`. Chaque dessin de projet a une animation ciblée au survol ou au focus, sans basculement de l'illustration. Les tracés des transitions se figent avec `prefers-reduced-motion`. Les médias de projet sont chargés à la demande. La navigation clavier, les états de focus, les alternatives d'image et le lien d'évitement sont conservés.

## Stack et vérification

Astro statique, TypeScript strict, CSS sur mesure et JavaScript client limité aux interactions. `npm run check` vérifie les types, le lint et le formatage. `npm run build` produit les pages françaises, anglaises, les études de cas et les images Open Graph. Le déploiement GitHub Pages utilise le workflow existant.

Le site doit rester utilisable à partir de 320 px sans débordement horizontal. Le contenu reste lisible sans JavaScript. Les liens externes sont issus de `content/data.json`.
