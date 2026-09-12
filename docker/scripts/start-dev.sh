#!/bin/sh
set -eu
npm install --no-audit --no-fund
npm run db:generate
npm run db:migrate:deploy
exec npm run dev -- --hostname 0.0.0.0
