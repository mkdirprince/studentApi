# Base image with pnpm setup
FROM node:20.17-slim AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

# Install pnpm directly using npm
RUN npm install -g pnpm

WORKDIR /usr/src/app

# Copy all files into the container
COPY --chown=node:node . .

RUN pnpm install --frozen-lockfile

# Stage for building the application (requires build tools)
FROM base AS build

# Install all dependencies (dev and prod) and run TypeScript compilation
RUN pnpm install --frozen-lockfile --ignore-scripts && \
    pnpm run tsc

# Stage for production dependencies (no need for build tools here)
FROM base AS prod-deps

# Install only production dependencies without running any lifecycle scripts
RUN pnpm install --prod --frozen-lockfile --ignore-scripts

# Final production image (combines dependencies and built files)
FROM base

# Copy production dependencies
COPY --from=prod-deps /usr/src/app/node_modules /usr/src/app/node_modules

# Copy the built application from the build stage
COPY --from=build /usr/src/app/build /usr/src/app/build

# Use a non-root user
USER node

# Run the application using pnpm
CMD ["pnpm", "start"]


