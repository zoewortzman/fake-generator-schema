import { NextRequest, NextResponse } from 'next/server';
const { Client } = require('pg');

// Replace with your actual connection string
const connectionString = process.env.CONNECTION_STRING;

const client = new Client({
  connectionString: connectionString,
});

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const { sqlCommand }: { sqlCommand: string } = await request.json();
    await client.connect();
    console.log('Connected to the database.');
    await client.query(sqlCommand);
    console.log('SQL command executed successfully.');
    return NextResponse.json('SQL command executed successfully.');

  } catch (err) {
    console.error('Error executing SQL command:', err);
    return NextResponse.json('Failed to execute SQL command', { status: 500 });
    
  } finally {
    await client.end();
  }
}
