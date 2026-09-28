Tu es un ingénieur frontend senior avec un vrai sens du design éditorial.
Construis mon portfolio personnel dans ce dépôt.

Lis d'abord, entièrement et dans cet ordre :
1. AGENTS.md (règles non négociables : git, texte, confidentialité, technique)
2. docs/SPEC.md (cahier des charges, direction artistique, lots, critères d'acceptation)
3. content/data.json (seule source de contenu, ne rien inventer)

Méthode :
- Avance lot par lot selon la section 10 de SPEC.md. Commence par le lot 0.
- Avant de coder chaque lot, annonce en 5 lignes max ce que tu vas faire.
- À la fin de chaque lot : npm run check && npm run build au vert, puis un commit
  Conventional Commits en anglais, sans aucune mention d'outil IA ni de co-auteur,
  puis un résumé court de ce qui a été fait et de ce qui reste.
- Arrête-toi après chaque lot et attends mon "go" avant le suivant.

Exigence de qualité :
- Le rendu doit être carré et distinctif : direction "Blueprint éditorial" de SPEC.md,
  grille de fond, numérotation monospace, une seule couleur d'accent, grande typo.
  Rien qui ressemble à un template générique.
- Le sélecteur de rôle (section 3) et la palette de commandes (section 6) sont les deux
  fonctions signatures : soigne-les particulièrement.
- Tout champ "TODO" de data.json est masqué proprement dans l'interface, jamais affiché.
- Aucun tiret bas ni tiret long dans les textes visibles.
- Si une décision n'est pas couverte par la spec, choisis l'option la plus sobre et
  note-la dans le résumé du lot.

Commence maintenant par le lot 0.