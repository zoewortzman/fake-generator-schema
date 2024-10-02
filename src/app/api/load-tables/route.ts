import { NextRequest, NextResponse } from "next/server";
import { Client } from "pg";

export async function POST(request:NextRequest ): Promise<NextResponse> {
  const connectionString = process.env.CONNECTION_STRING;
   
  const client = new Client({
    connectionString: connectionString,
  });

  try {
    await client.connect();
    const { tableName } = await request.json();
    const data = await client.query(`SELECT * FROM ${tableName}`);
    return NextResponse.json({ message: `Table feteched`, data:data});
  } catch (err) {
    console.error("Error executing SQL command:", err);
    return NextResponse.json("Failed to fetch table", { status: 500 });
  } finally {
    await client.end();
  }
}
