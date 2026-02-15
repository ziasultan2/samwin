# Dockerfile
FROM node:20-alpine

WORKDIR /app

# Install deps first (better layer caching)
COPY package*.json ./
# If you use pnpm/yarn, adjust accordingly
RUN npm ci

# Copy source
COPY . .

EXPOSE 4000

# For dev: Nest usually runs via `nest start --watch` or `npm run start:dev`
CMD ["npm", "run", "start:dev"]
