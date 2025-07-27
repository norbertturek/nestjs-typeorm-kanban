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

# Install only production dependencies
RUN yarn install --production --network-timeout 1000000

# Install Node.js to run our env script (alpine-sdk includes make, g++)
RUN apk add --no-cache python3 make g++

# Copy and run the environment setup script
COPY railway-env.js .

# Expose the port the app runs on
EXPOSE 3000

# Map Railway's environment variables and start the application
CMD ["sh", "-c", "node railway-env.js && node dist/main.js"]
