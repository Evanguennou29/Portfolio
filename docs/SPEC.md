# Portfolio Evan Guennou : cahier des charges

## 1. Objectif
Un site personnel qui convainc en 30 secondes un recruteur (LinkedIn, Welcome to the Jungle,
APEC, cabinets, ESN) ou un manager data que Evan construit des produits IA qui sortent du
notebook, puis lui permet en 2 minutes de verifier le fond (code, architecture, choix).

Cibles : recruteurs et chasseurs (lecture rapide, besoin du CV et des infos pratiques),
managers techniques (lecture des etudes de cas, liens GitHub).

## 2. Positionnement
- Titre : AI Engineer
- Sous le titre : "1 an d'expérience" et "CDI, disponible à partir d'octobre 2026".
- Accroche FR : "Je conçois des produits d'IA générative, de la donnée brute à l'interface."
- Accroche EN : "I build generative AI products, from raw data to the interface."
- Preuves mises en avant : un outil IA complet livre en stage (extraction LLM, RAG, React),
  un projet data engineering deploye (eco2mix-elt), des projets multi agents (Syntho Crowd).

## 3. Mode "role cible" (fonction signature)
Evan cible 5 postes : AI Engineer, ML Engineer, Data Scientist, Data Engineer, Data Analyst.
Un selecteur de role (chips dans le hero, parametre d'URL ?role=ml, memorise en localStorage
avec try/catch) change :
- le sous titre du hero (texte par role dans data.json, transition "text scramble" 400 ms),
- l'ordre des projets (champ roles de chaque projet, tri par pertinence),
- les competences mises en surbrillance,
- le bouton "Télécharger le CV" qui pointe vers le PDF du role et de la langue :
  /cv/evan-guennou-{role}-{lang}.pdf (fichiers fournis par Evan dans public/cv/).
  Si le PDF n'existe pas au build, fallback sur la version ai-engineer.
Role par defaut : AI Engineer.

## 4. Arborescence
- `/` (FR) et `/en/` (EN), meme structure :
  1. Hero : nom, titre, accroche, selecteur de role, CTA (CV, GitHub, contact),
     schema anime "Data, Modèle, Produit" en SVG trace au chargement.
  2. Fiche express (pour recruteurs) : disponibilité, localisation, mobilité, langues,
     type de contrat recherché, bouton copier l'email. Grille de 6 cellules façon tableau technique.
  3. 01 / Projets : 3 projets phares en grandes cartes, le reste en liste compacte.
  4. 02 / Expérience : timeline verticale (Thales, CANAL+), missions en puces courtes.
  5. 03 / Compétences : matrice par domaine (IA générative, ML, Data engineering, Web, Outils),
     puces surlignées selon le role actif. Pas de barres de niveau en pourcentage.
  6. 04 / Parcours : ESILV, échange RTU Riga, certifications.
  7. 05 / Au delà du code : associations et loisirs (courts, humains).
  8. Contact : email en grand, liens, bouton copier.
- `/projets/[slug]` et `/en/projects/[slug]` : étude de cas (gabarit section 7).
- `/404` stylée (ligne de commande "route not found", lien retour).

## 5. Direction artistique : "Blueprint éditorial"
Carré, technique, lisible. Inspiration : plan d'architecte + magazine. Pas de dégradés
violets génériques, pas de glassmorphism, pas d'emojis.

Principes :
- Grille de fond visible (lignes 1 px, opacité 4 à 6 %), alignée sur la grille de contenu.
- Numérotation des sections en monospace ("01 / Projets"), petites étiquettes techniques
  (stack, année, statut) en monospace majuscules espacées.
- Bordures fines, angles droits ou rayon 2 px, une seule couleur d'accent.
- Beaucoup d'espace, typographie grande pour les titres, contenu sur 12 colonnes.

Tokens (CSS custom properties sur :root, thème sombre par défaut) :
```
--bg:        #0B0D10   (light: #F6F5F1)
--surface:   #12151A   (light: #FFFFFF)
--line:      #232833   (light: #DAD8D0)
--text:      #E8EAED   (light: #0E1116)
--muted:     #8A93A3   (light: #5B6270)
--accent:    #4C8DFF   (light: #1F4FD6)   bleu, cohérent avec le CV bleu marine
--signal:    #7CFFB2   (light: #0F8A4B)   uniquement pour "live", "disponible"
--radius:    2px
--space:     4px scale (4, 8, 12, 16, 24, 32, 48, 64, 96, 128)
--maxw:      1200px ; gouttière 16px mobile, 32px desktop
```
Typographie (auto hébergée via @fontsource, font-display swap) :
- Titres et texte : Inter Tight (600 titres, 400 texte), titres en clamp(2.5rem, 6vw, 5.5rem).
- Labels, code, chiffres : JetBrains Mono 400/500.

Mouvement (tout désactivé si prefers-reduced-motion) :
- Apparition des sections au scroll (IntersectionObserver, translateY 12px + opacité, 300 ms).
- Cartes projet : spotlight qui suit le curseur (radial-gradient sur --mx/--my), bordure accent.
- View Transitions API entre la liste et l'étude de cas (titre et visuel partagés).
- Schéma du hero : stroke-dashoffset animé une fois, puis petites impulsions le long des traits.

## 6. Palette de commandes (Ctrl+K / Cmd+K, et bouton dans le header)
Actions : aller à une section, ouvrir un projet, changer de rôle, changer de langue,
basculer le thème, copier l'email, télécharger le CV, ouvrir GitHub.
Recherche floue maison (pas de lib lourde), navigation clavier complète, focus piégé,
fermeture Échap, rôle dialog accessible.

## 7. Gabarit étude de cas
1. En-tête : titre, année, rôle d'Evan, statut (live / terminé / en cours), liens (repo, démo).
2. Contexte et problème (3 à 5 lignes).
3. Approche et architecture : schéma SVG simple (boîtes et flèches, style blueprint).
4. Stack (étiquettes).
5. Résultats : uniquement des éléments vérifiables (démo en ligne, CI verte, tests, GIF).
6. Ce que j'ai appris / ce que je referais autrement.
7. Navigation projet précédent / suivant.
Visuels : captures ou GIF dans public/img/{slug}/ ; si absent, afficher le schéma seul.

## 8. Stack et qualité
- Astro statique, TypeScript strict, CSS natif (nesting, container queries, :has, clamp).
- i18n : routing Astro natif, FR par défaut sans préfixe, EN sous /en/, sélecteur de langue
  qui conserve la page et le rôle.
- Budget : JS client total < 40 kB gzip, LCP < 1,5 s sur 4G, CLS < 0,05.
- Lighthouse >= 95 sur les 4 axes (mobile).
- Accessibilité : WCAG AA, contraste vérifié dans les deux thèmes, focus visible, lien
  d'évitement, navigation clavier totale, alt sur toutes les images.
- SEO : balises title/description par page et par langue, hreflang, sitemap, robots.txt,
  JSON-LD Person, image Open Graph générée au build (satori ou équivalent) par page.
- Scripts npm : dev, build, preview, check (astro check + eslint + prettier --check).
- CI GitHub Actions : check + build sur chaque push, déploiement GitHub Pages sur main.

## 9. Structure du dépôt
```
content/data.json          source unique du contenu (FR/EN)
public/cv/                 PDF des CV par rôle et langue
public/img/{slug}/         visuels des projets
src/components/            Hero, RoleSwitcher, QuickFacts, ProjectCard, Timeline,
                           SkillsMatrix, CommandPalette, ThemeToggle, LangSwitch, Footer
src/layouts/Base.astro
src/pages/                 index, projets/[slug], en/index, en/projects/[slug], 404
src/styles/                tokens.css, base.css, grid.css
src/lib/                   content.ts (lecture typée de data.json), roles.ts, i18n.ts
docs/SPEC.md, AGENTS.md, README.md
```

## 10. Plan de livraison par lots
0. Squelette Astro, TS strict, lint, CI, déploiement Pages d'une page vide.
1. Design system : tokens, typo, grille de fond, layout, thème clair/sombre.
2. Page d'accueil statique complète depuis data.json (FR).
3. Sélecteur de rôle + liens CV par rôle.
4. Pages études de cas + View Transitions.
5. Palette de commandes + animations.
6. Version EN complète.
7. SEO, OG images, perfs, accessibilité (audit Lighthouse et axe).
8. README (en anglais, captures, stack, lancement local) et déploiement final.

## 11. Critères d'acceptation
- Aucun texte inventé : tout provient de data.json, les TODO sont masqués proprement.
- Aucun tiret bas ni tiret long dans les textes visibles.
- Aucune trace d'outil IA dans l'historique git ou le contenu.
- Fonctionne sans JavaScript (contenu lisible, rôle par défaut).
- Responsive de 360 px à 1920 px sans scroll horizontal.
- Lighthouse >= 95 partout, zéro erreur axe.

## 12. À fournir par Evan (TODO dans data.json)
Photo (optionnelle), PDF des CV par rôle, mobilité, liens des dépôts encore marqués TODO,
visuels des projets (public/img/{slug}/), nom de domaine éventuel.
Champs de contenu utilisables dans les études de cas : context, question, highlights,
findings, media, period. Les afficher quand ils existent, les ignorer sinon.