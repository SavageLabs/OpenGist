# Decreased image size = Faster deploy. Master Node.
FROM node:current-slim AS base

# Create app directory
WORKDIR /usr/src/app

# This files won't be needed until later
COPY ["./database", "./database"]

# Cached Step = Faster image build
EXPOSE 3000

# Build the project before releasing
FROM node:current-slim AS build

# Switch towards a safe directory
WORKDIR /usr/src/temp

# Copy needed files for building
COPY ["./LICENSE", "./"]
COPY ["./public", "./public"]
COPY ["./package.json", "yarn.lock", "./"]
COPY ["./src", "./src"]

# Auto build the project
RUN npm install && npm install yarn && yarn build

# Use the Master Node for releasing
FROM base AS release
WORKDIR /usr/src/app

# Set the production context files
COPY ["./context/", "./"]

# Install production dependencies
RUN ["npm", "install"]

# Copy built project
COPY --from=build /usr/src/temp/build ./build

CMD [ "npm", "start" ]