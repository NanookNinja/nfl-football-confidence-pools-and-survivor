# Tim’s NFL Pool Room

Private NFL confidence and survivor app with original history through Week 5 and Week 6 planning.

## Features
- Add Excel attachments: review week and type, then apply.
- Templates, weekly picks/results, overall points, and survivor colors.
- Original uploads preserved with SHA-256 deduplication.
- Account-scoped shared saving with conflict detection.
- Confidence draft and email text generator; nothing is sent automatically.

## Status
Spreadsheet parser checks passed against original files (18 confidence players, 19 survivor players, 14 Week 6 games), including picks/results reconciliation and wrong-week rejection.
The production build and browser tests are NOT verified. Local Windows build failed on a filesystem realpath access check. Source publishing was blocked by automatic approval review. No live deployment exists yet.

## Hosting
This project targets OpenAI Sites / Cloudflare Workers with D1 and R2. It is not a GitHub Pages static app. GitHub can store the source privately, but hosting needs the configured Workers runtime and authenticated identity gateway. Do not make the repository public: it contains private pool history and original email records.

Use the Sites source and publish workflow with the existing project ID in .openai/hosting.json; do not create another Site. Install dependencies with npm run install:ci, build using the Sites build helper, and deploy schema migrations. Once live, sign in to the same account on both devices.

Fresh template imports use 50/50 placeholders until researched probabilities are entered. Research is not automatically refreshed. No Wednesday automation or email sending is enabled.
