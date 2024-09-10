import { Client } from 'pg';

// Create a PostgreSQL client
const client = new Client({
  connectionString: process.env.DATABASE_URL, // Use environment variable for database connection string
});

export default client;