# Declare the variables
ARG BUILD_ENV
ARG VIETCAP_NODEJS_ALPINE_IMAGE
ARG VIETCAP_NODEJS_PACKAGES_IMAGE
ARG CI_JOB_TOKEN

# Use a multi-stage build for smaller final image
FROM node:21-alpine3.18 AS build_image

# Set the working directory inside the container to /usr/src/app
WORKDIR /usr/src/app

# Declare the variables
ARG BUILD_ENV
ARG CI_JOB_TOKEN

COPY . .

# Clear npm cache, remove existing node_modules, and install dependencies
RUN rm -rf node_modules package-lock.json

RUN npm install -g pnpm

# Install dependencies
RUN pnpm install

# Build the project
RUN mv .env.${BUILD_ENV} .env && pnpm build

# STAGE: dependencies_prod - Start this stage too reduce dependencies's size (with dependencies && skip devDependencies)
FROM node:21-alpine3.18 AS dependencies_prod_image

# Set the working directory inside the container to /usr/src/app
WORKDIR /usr/src/app

# Create new package.json from package.prod.json
COPY package.prod.json package.json

RUN npm install -g pnpm@9.6.0

# Install new package.json
RUN pnpm install --prod

# NOTE: "build_image" stage and "dependencies_prod_image" stage will run at the same time

# STAGE: final
FROM node:21-alpine3.18 AS final_image

# Set the working directory inside the container to /usr/src/app
WORKDIR /usr/src/app

# Declare the variables
ARG BUILD_ENV

# Set environment variables
ENV NODE_ENV="${BUILD_ENV}" \
    APPLICATION_PORT=80 \
    DEBUG_PORT=82

# Expose necessary ports
EXPOSE 80 82

# Copy only necessary files from the build stage and dependencies_prod stage
COPY --from=build_image /usr/src/app/server.mjs .
COPY --from=build_image /usr/src/app/dist ./dist
COPY --from=dependencies_prod_image /usr/src/app/node_modules ./node_modules

# Command to run the application
CMD ["node", "server.mjs"]
