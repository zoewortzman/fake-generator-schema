import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 
// export async function GET(request: Request) {
//   try {
//     const result =
//       await sql`CREATE TABLE Pets ( Name varchar(255), Owner varchar(255) );`;
//     return NextResponse.json({ result }, { status: 200 });

export async function GET(request: Request) {
  try {
    const result = 
    await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      );
    `;
    return NextResponse.json({ result }, { status: 200 }); 
      } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}