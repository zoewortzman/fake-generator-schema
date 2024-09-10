const { Client } = require('pg');
const { NextRequest, NextResponse } = require('next/server');

const connectionString = 'postgresql://postgres.urabuonbrmozvckwiend:zuphip-5difBu-xigwyx@aws-0-us-west-1.pooler.supabase.com:6543/postgres'

const client = new Client({
  connectionString: connectionString,
});

async function testConnection() {
  try {
    await client.connect();
    console.log('Connected to the database.');

    const res = await client.query('SELECT NOW()');
    console.log('Database response:', res.rows);

  } catch (err) {
    console.error('Connection error:', err);

  } finally {
    await client.end();
  }
}

testConnection();
