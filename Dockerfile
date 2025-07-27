# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile --network-timeout 1000000

# Copy source code
COPY . .

# Build the application
RUN yarn build

# Production stage
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package.json yarn.lock ./

# Install only production dependencies
RUN yarn install --production --frozen-lockfile --network-timeout 1000000

# Copy built application from builder
COPY --from=builder /app/dist ./dist

# Copy required files for runtime
COPY --from=builder /app/node_modules ./node_modules

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["node", "dist/main.js"]
