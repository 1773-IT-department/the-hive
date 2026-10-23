# The Hive website prototype

Next.js 14 site for The Hive coworking space (Tse Addo, Accra), built from the Claude Design prototype.

- `scripts/import-prototype.mjs <folder>` imports the Claude Design `.dc.html` pages into `content/`
- `scripts/patch-content.mjs` applies the mobile fixes (Manager Dashboard drawer and stacked layouts)
- Every route is pre-rendered as static HTML; the design runtime and React are self-hosted in `public/`

Prepared by Bezalel Junior.
