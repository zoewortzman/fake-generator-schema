import { NextRequest, NextResponse } from 'next/server';
const { Client } = require('pg');

// Replace with your actual connection string
const connectionString = 'postgresql://postgres.urabuonbrmozvckwiend:zuphip-5difBu-xigwyx@aws-0-us-west-1.pooler.supabase.com:6543/postgres';

const generateCreateTableSQL = (tableName:string, tableFields: [{name: string, dataType: string, dataFormat:string}]): string => {
  const columnDefinitions = tableFields.map(field => {
    return `${field.name} ${field.dataType}`;
  }).join(', ');
  const sqlCommand = `CREATE TABLE ${tableName} (${columnDefinitions});`;
  return sqlCommand;
};

async function fetchMockarooData(fields:{name:string, type:string}) {
  const MOCKAROO_API_KEY = 'c7e77960';
  const MOCKAROO_API_URL = 'https://api.mockaroo.com/api/generate.sql';

  const response = await fetch(`${MOCKAROO_API_URL}?key=${MOCKAROO_API_KEY}&count=10`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(fields),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch data from Mockaroo');
  }
  return response.text();
}

export async function POST(request: NextRequest): Promise<NextResponse> {

  const client = new Client({
    connectionString: connectionString,
  });
  
  try {
    // Parse the request body to get the SQL command
    const {tableName, tableFields} = await request.json();

    if (!tableFields) {
      throw new Error('Table schema is missing.');
    }

    if (!tableName) {
        throw new Error('Table name is missing')
    }

    const sqlCreate = generateCreateTableSQL(tableName, tableFields)

    // Connect to the database
    await client.connect();
    console.log('Connected to the database.');
    await client.query(`DROP TABLE IF EXISTS ${tableName}`)

    await client.query(sqlCreate);

  const fields = tableFields.map((field:{name: string, dataType: string, dataFormat:string}) => ({
    name: field.name,
    type: field.dataFormat
  }));

   let mockarooData = await fetchMockarooData(fields);

   const sqlInserts = mockarooData
   .replace(/insert into\s+\(/g, `insert into ${tableName} (`)
   .trim(); // Optionally trim leading/trailing whitespace

   await client.query(sqlInserts)

   const data = await client.query(`SELECT * FROM ${tableName}`)

   await client.query(`INSERT INTO fakedata_tablenames (table_name)
VALUES ('${tableName}');`)

  return NextResponse.json({ message: `Simulated data inserted into table ${tableName}`, data: data});

  // return NextResponse.json({
  //   // message: 'SQL command executed and schema retrieved successfully.',
  //   message: `${tableName}`,
  //   // name: tableName,
  //   // query:sqlCreate,
  //   // schema: result.rows,
  //   data:mockarooData
  // });


  } catch (err) {
    console.error('Error executing SQL command:', err);
    return NextResponse.json('Failed to execute SQL command', { status: 500 });
    
  } finally {
    await client.end();
  }
}

export async function PUT(request: NextRequest): Promise<NextResponse> {
  try {
    const {tableName} = await request.json();

    if (!tableName) {
        throw new Error('Table name is missing')
    }
    await client.connect();
    console.log('Connected to the database.');
   const data = await client.query(`SELECT * FROM ${tableName}`)

   return NextResponse.json({ message: `More data feteched`, data: data});

  } catch (err) {
    console.error('Error executing SQL command:', err);
    return NextResponse.json('Failed to execute SQL command', { status: 500 });
    
  } finally {
    await client.end();
  }
}
