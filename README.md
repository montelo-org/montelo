# Montelo

For usage documentation, see [documentation](https://docs.montelo.ai).

This document is meant for development.

## Deploy

Deploy to Railway button.

## Technologies

- [Turborepo](https://turbo.build/repo) for the smart 🧠 build system.
- [Changesets](https://github.com/changesets/changesets) to handle package versioning 🔢.
- [Rollup](https://rollupjs.org/) as the fast ⚡️ module bundler for `apps/montelo`.
- [NestJS](https://nestjs.com/) as the 🐐 backend framework.
- [Prisma](https://www.prisma.io/) as the 🐐 ORM.
- [BullMQ](https://bullmq.io/) for background log processing 🐂.
- [PassportJS](https://www.passportjs.org/) for auth 🔐.
- [Remix](https://remix.run/) as the modern 🙏 frontend framework.
- [shadcn](https://ui.shadcn.com/) as the cleanest 🧼 component library.
- [Railway](https://railway.app/) for smooth 🕺 deployments for our servers and databases (Postgres & Redis).

## Setup

```bash
# at the root
npm install

npm run build
```

Then add a .env to wherever you see a .env.example (or example.env).

Then, make sure you have Postgres running locally, and Redis (`redis-server`).

Once that's ready, open 3 terminals and do:

```bash
# in separate terminals
cd apps/api && npm run dev
cd apps/log-server && npm run start:dev
cd apps/ui && npm run dev
```

You should be up and running!

## Client generation

When you make a change to your controllers, you'll have to regenerate the clients (search for `generate:client` commands).
