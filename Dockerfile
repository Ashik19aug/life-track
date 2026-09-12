FROM node:22-bookworm-slim

WORKDIR /app

RUN apt-get update \
  && apt-get install --yes --no-install-recommends openssl \
  && rm -rf /var/lib/apt/lists/*

COPY package.json package-lock.json ./
RUN npm install --no-audit --no-fund
COPY . .

EXPOSE 3000
CMD ["./docker/scripts/start-dev.sh"]
