
# syntax=docker/dockerfile:1

ARG NODE_VERSION=26.8.2

FROM node:${NODE_VERSION}-slim AS base

LABEL fly_launch_runtime="NestJS/Prisma"

WORKDIR /app

ENV NODE_ENV="production"

ARG PNPM_VERSION=12.4.2

RUN npm install -g pnpm@${PNPM_VERSION}


# Build stage
FROM base AS build

RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y \
    build-essential \
    node-gyp \
    openssl \
    pkg-config \
    python-is-python3 && \
    rm -rf /var/lib/apt/lists/*

# Copy dependency manifests
COPY package.json pnpm-lock.yaml ./

# Allow dependency build scripts before installation.
# Only use this for dependencies you trust.
RUN pnpm config set dangerouslyAllowAllBuilds true && \
    pnpm install --frozen-lockfile --prod=false

# Copy Prisma schema and generate Prisma Client
COPY prisma ./prisma

RUN pnpm exec prisma generate

# Copy application source
COPY . .

# Compile NestJS
RUN pnpm run build


# Production image
FROM base AS production

RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y openssl && \
    rm -rf /var/lib/apt/lists/* /var/cache/apt/archives/*

COPY --from=build /app /app

WORKDIR /app

EXPOSE 3000

CMD ["pnpm", "run", "start"]
