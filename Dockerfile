FROM node:20-alpine

WORKDIR /app

# Copy package files first for better layer caching
COPY package.json yarn.lock ./

# Install all dependencies
RUN yarn install --network-timeout 1000000

# Copy the rest of the application
COPY . .

# Build the application
RUN yarn build

# Prune dev dependencies
RUN yarn install --production --network-timeout 1000000

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["node", "dist/main.js"]
