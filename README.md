# dolmios.com

Personal site.

## Setup

```sh
pnpm install
pnpm db:migrate   # Create database tables
pnpm db:seed      # Add example matchbooks
```

## Development

```sh
pnpm dev          # Start dev server at localhost:420
pnpm db:studio    # Edit matchbooks (visual database editor)
```

## Database

SQLite database with Drizzle ORM. Edit in Drizzle Studio, then commit and push. For now, Database is read-only on Vercel (edit locally, deploy via git).

```sh
git add data/matchbooks.db
git commit -m "Updated db"
git push
```


## Deploy

```sh
pnpm tidy         # Lint and format
pnpm build        # Production build
pnpm sitemap      # Regenerate sitemap
```
