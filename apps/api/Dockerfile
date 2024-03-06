# syntax = docker/dockerfile:1
ARG NODE_VERSION=21.5.0

### BASE
FROM node:${NODE_VERSION}-slim as base
LABEL fly_launch_runtime="NestJS"
WORKDIR /app
ENV NODE_ENV="production"
# Install openssl for generating self-signed certificates
RUN apt-get update -y && apt-get install -y openssl


### BUILDER
FROM base as build
# Install packages needed to build node modules
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential node-gyp pkg-config python-is-python3
# Install node modules
COPY --link package.json ./
RUN npm install --include=dev
# Copy application code
COPY --link . .
# Build application
RUN npm run build


### RUNNER
FROM base
COPY --from=build /app /app
RUN chmod +x /app/docker-entrypoint.sh
EXPOSE 3000
ENTRYPOINT ["/app/docker-entrypoint.sh"]