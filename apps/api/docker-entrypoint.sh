#!/bin/bash
set -e

# Run Prisma migrations
cd /app/node_modules/@montelo/db
npx prisma migrate deploy

# Start the application
cd /app
npm run start