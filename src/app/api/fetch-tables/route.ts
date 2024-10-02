import { NextResponse } from "next/server";
const { Client } = require('pg');

// Replace with your actual connection string
const connectionString =
  "postgresql://postgres.urabuonbrmozvckwiend:zuphip-5difBu-xigwyx@aws-0-us-west-1.pooler.supabase.com:6543/postgres";

export async function POST(): Promise<NextResponse> {
    const client = new Client({
        connectionString: connectionString,
      });
      await client.connect();
  try {
    const data = await client.query(`SELECT table_name FROM fakedata_tablenames`);
    // Return successful response with fetched data
    return NextResponse.json({ message: 'Table names fetched', data: data.rows});
} catch (err) {
    console.error("Error executing SQL command:", err);
    // Return an error response
    return NextResponse.json("Failed to execute SQL command", { status: 500 });
  } finally {
    // Close the database connection
    await client.end();
  }
}

