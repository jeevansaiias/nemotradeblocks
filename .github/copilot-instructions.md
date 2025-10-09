<!-- .github/copilot-instructions.md - guidance for AI coding agents working in NemoAnalytics -->
# Copilot instructions for NemoAnalytics (Next.js + IndexedDB analytics)

Be succinct and make edits in-context. Focus on the files and modules listed below — they contain the authoritative implementation details.

Quick-start commands
- Install: `npm install`
- Dev server (Turbopack): `npm run dev` (visit http://localhost:3000 -> redirects to /blocks)
- Build: `npm run build` and `npm start`
- Tests: `npm test` (uses Jest + `fake-indexeddb`), `npm run test:coverage`
- Lint: `npm run lint`

Big picture (what to change and where)
- App router and UI: `app/` and `components/` (primary screens under `app/(platform)/`).
- Domain logic (parsing, processing, calculations): `lib/processing/*`, `lib/calculations/*`.
- Persistence layer: IndexedDB adapters in `lib/db/` (see `lib/db/index.ts` for DB name, store names and indexes).
- State management: Zustand stores in `lib/stores/` (e.g. `block-store.ts`, `performance-store.ts`).

Key patterns and invariants
- Block-based model: a "block" groups a trade log (required), optional daily log, and cached calculations. ProcessedBlock stores references to raw data in IndexedDB — load trades/daily logs explicitly via `lib/db` helpers.
- Dual-storage: raw datasets => IndexedDB; UI metadata/state => Zustand + `localStorage` (active block id key: `nemoanalytics-active-block-id`).
- Math parity with legacy Python: statistical functions use `math.js` configured to match NumPy behavior (pay attention to std variants: sample vs population — e.g. Sharpe uses sample/uncorrected, Sortino uses biased/population). See `lib/calculations/portfolio-stats.ts`.
- CSV parsing and aliases: CSV header normalization happens in `lib/processing/csv-parser.ts` and processors (`trade-processor.ts`, `daily-log-processor.ts`). Prefer those utilities when ingesting CSVs.

Concrete integration points
- Initialize/inspect DB: `initializeDatabase()` and `STORES` constants in `lib/db/index.ts` (DB name `NemoAnalyticsDB`, stores: `blocks`, `trades`, `dailyLogs`, `calculations`).
- Common DB helpers used by UI: `getTradesByBlock`, `getDailyLogsByBlock`, `getAllBlocks`, `createBlock`, `getBlock` re-exported from `lib/db`.
- Store lifecycle: `useBlockStore.loadBlocks()` loads blocks and uses `getTradesByBlock`/`getDailyLogsByBlock` to populate counts and basic stats (see `lib/stores/block-store.ts`).

Editing guidance (typical tasks)
- Add/modify a calculation: change `lib/calculations/*`, add unit tests under `tests/unit/` (fixtures in `tests/data/`), run `npm test`.
- Change persistence schema: update `DB_VERSION` and migration logic in `lib/db/index.ts`; update tests to use `fake-indexeddb`.
- Update CSV field mappings: edit alias lists or processors in `lib/processing/*` (they normalize headers to `lib/models/*` types).

Debugging tips
- IndexedDB debugging: browser DevTools → Application → IndexedDB; stores mirror `STORES` names. To reset local app state, delete DB or clear `localStorage.nemoanalytics-active-block-id`.
- Run a single Jest file: `npm test -- path/to/file.test.ts` or run a single test with `-t "pattern"`.

Conventions to follow
- Use `@/*` path alias (configured in `tsconfig.json`) for imports.
- Keep calculations in `lib/calculations` and UI wiring in `components/` and `app/(platform)/` routes.
- Tests must use the fixtures in `tests/data/` and the shared `tests/setup.ts` (Jest setup config).

When in doubt
- Consult the legacy reference in `legacy/` for Python implementations of calculations (math parity is important).
- Search for the function or constant name (e.g. `STORES`, `initializeDatabase`, `portfolio-stats`) before adding new files.

If you update this file, keep it concise and reference the primary files above.
