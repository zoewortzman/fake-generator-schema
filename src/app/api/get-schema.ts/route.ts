import { NextRequest, NextResponse } from 'next/server';
const { Client } = require('pg');

// Replace with your actual connection string
const connectionString = 'postgresql://postgres.urabuonbrmozvckwiend:zuphip-5difBu-xigwyx@aws-0-us-west-1.pooler.supabase.com:6543/postgres';

const client = new Client({
  connectionString: connectionString,
});

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    // Parse the request body to get the SQL command
    const { sqlCommand }: { sqlCommand: string } = await request.json();

    // Connect to the database
    await client.connect();
    console.log('Connected to the database.');

    // Execute the SQL command
    await client.query(sqlCommand);
    console.log('SQL command executed successfully.');

    // Return a success response
    return NextResponse.json('SQL command executed successfully.');

  } catch (err) {
    console.error('Error executing SQL command:', err);

    // Return an error response
    return NextResponse.json('Failed to execute SQL command', { status: 500 });
    
  } finally {
    // Close the database connection
    await client.end();
  }
}
