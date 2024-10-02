import { NextResponse } from "next/server";
const { Client } = require('pg');

const connectionString = process.env.CONNECTION_STRING;

export async function POST(): Promise<NextResponse> {
    const client = new Client({
        connectionString: connectionString,
      });
      await client.connect();
  try {
    const data = await client.query(`SELECT table_name FROM fakedata_tablenames`);
    return NextResponse.json({ message: 'Table names fetched', data: data.rows});
} catch (err) {
    console.error("Error executing SQL command:", err);
    return NextResponse.json("Failed to execute SQL command", { status: 500 });
  } finally {
    await client.end();
  }
}

