import { NextRequest, NextResponse } from "next/server";
import { supabase } from '../../lib/supabaseClient';

export async function POST(request: NextRequest): Promise<NextResponse> {

try {
    const {tableName}  = await request.json();
    const { data, error } = await supabase.from(tableName)
    .select('*').csv();
    const headers = {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename=${tableName}.csv`,
      };
      return new NextResponse(data, { headers });
  } catch (err) {
    console.error("Error executing SQL command:", err);
    return NextResponse.json("Failed to download table", { status: 500 });
  }
}
