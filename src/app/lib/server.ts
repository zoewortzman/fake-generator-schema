const { Client } = require('pg');
const { NextRequest, NextResponse } = require('next/server');

const connectionString = process.env.CONNECTION_STRING;

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
