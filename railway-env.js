// This script maps Railway's environment variables to the ones expected by the application
const fs = require('fs');

// Map Railway's env vars to our app's expected vars
const env = {
  POSTGRES_HOST: process.env.PGHOST,
  POSTGRES_PORT: process.env.PGPORT,
  POSTGRES_USER: process.env.PGUSER,
  POSTGRES_PASSWORD: process.env.PGPASSWORD,
  POSTGRES_DB: process.env.PGDATABASE,
  POSTGRES_SYNCHRONIZE: process.env.NODE_ENV !== 'production' ? 'true' : 'false',
  // Keep all other environment variables
  ...process.env,
};

// Convert to .env format
const envContent = Object.entries(env)
  .filter(([key]) => key && env[key] !== undefined)
  .map(([key, value]) => `${key}=${value}`)
  .join('\n');

// Write to .env file
fs.writeFileSync('.env', envContent);

console.log('Railway environment variables mapped successfully!');
