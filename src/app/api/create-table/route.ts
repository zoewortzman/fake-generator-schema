import { NextRequest, NextResponse } from 'next/server';
const { Client } = require('pg');

// Replace with your actual connection string
const connectionString = 'postgresql://postgres.urabuonbrmozvckwiend:zuphip-5difBu-xigwyx@aws-0-us-west-1.pooler.supabase.com:6543/postgres';

const client = new Client({
  connectionString: connectionString,
});

function extractTableName(sqlCommand:string) {
  const regex = /CREATE\s+TABLE\s+IF\s+NOT\s+EXISTS\s+(\w+)/i;
  const match = sqlCommand.match(regex);
  return match ? match[1] : null;
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    // Parse the request body to get the SQL command
    const { sqlCommand }: { sqlCommand: string } = await request.json();

    const tableName = extractTableName(sqlCommand);

    

    // Connect to the database
    await client.connect();
    console.log('Connected to the database.');

    // Execute the SQL command
    await client.query(sqlCommand);
    console.log('SQL command executed successfully.');

    // Return a success response
    console.log('SQL command executed successfully.');


    const schemaQuery = `
    SELECT column_name, data_type
    FROM information_schema.columns
    WHERE table_name = $1
  `;

  // Execute the query to get schema information
  const result = await client.query(schemaQuery, [tableName]);
  console.log('Schema result:', result.rows);

  return NextResponse.json({
    message: 'SQL command executed and schema retrieved successfully.',
    name:tableName,
    schema: result.rows,

  });


  } catch (err) {
    console.error('Error executing SQL command:', err);

    // Return an error response
    return NextResponse.json('Failed to execute SQL command', { status: 500 });
    
  } finally {
    // Close the database connection
    await client.end();
  }
}
