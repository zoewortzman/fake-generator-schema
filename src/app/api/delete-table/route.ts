import { NextRequest, NextResponse } from "next/server";
import { supabase } from '../../lib/supabaseClient';

const { Client } = require('pg');
const connectionString =
  "postgresql://postgres.urabuonbrmozvckwiend:zuphip-5difBu-xigwyx@aws-0-us-west-1.pooler.supabase.com:6543/postgres";

export async function POST(request: NextRequest): Promise<NextResponse> {

try {
    const client = new Client({
        connectionString: connectionString,
      });
      await client.connect();

    const {tableName}  = await request.json();

    await client.query(`DROP TABLE IF EXISTS ${tableName}`);

    const { error } = await supabase
    .from('fakedata_tablenames')
    .delete()
    .eq('table_name', tableName)

      return NextResponse.json("Table deleted")
  } catch (err) {
    console.error("Error executing SQL command:", err);
    return NextResponse.json("Failed to download table", { status: 500 });
  } finally {
    await client.end();
  }
}
