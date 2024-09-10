const { Client } = require('pg');

// Replace with your actual connection string
const connectionString = 'postgresql://postgres.urabuonbrmozvckwiend:zuphip-5difBu-xigwyx@aws-0-us-west-1.pooler.supabase.com:6543/postgres';

const client = new Client({
  connectionString: connectionString,
});

import client from '../src/app/supabaseClient'

async function testConnection() {
  try {
    // Connect to the database
    await client.connect();
    console.log('Connected to the database successfully.');

    // Perform a simple query to test
    const res = await client.query('SELECT NOW()');
    console.log('Current timestamp from the database:', res.rows[0].now);

  } catch (err) {
    console.error('Error connecting to the database:', err.message);
  } finally {
    // Close the database connection
    await client.end();
  }
}

testConnection();
