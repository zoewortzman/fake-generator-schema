import { NextRequest, NextResponse } from 'next/server';
const { Client } = require('pg');

// Replace with your actual connection string
const connectionString = process.env.CONNECTION_STRING;

const client = new Client({
  connectionString: connectionString,
});


const generateCreateTableSQL = (tableName: string, columnNames: string[], dataTypes: string[]): string => {
  const columnDefinitions = columnNames.map((name, index) => {
    return `${name} ${dataTypes[index]}`;
  }).join(', ');
  // Create the SQL statement
  const sqlCommand = `CREATE TABLE ${tableName} (${columnDefinitions});`;
  return sqlCommand;
};

async function fetchMockarooData(fields:{name:string, type:string}) {
  const MOCKAROO_API_KEY = 'c7e77960'; // Replace with your actual API key
  const MOCKAROO_API_URL = 'https://api.mockaroo.com/api/generate.sql';


  const response = await fetch(`${MOCKAROO_API_URL}?key=${MOCKAROO_API_KEY}&count=1`, {
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
  try {
    // Parse the request body to get the SQL command
    const {tableSchema } = await request.json();
    if (!tableSchema) {
      throw new Error('Table schema is missing.');
    }
    const { columnNames,
      dataTypes,
      format,
      tableName } = tableSchema
    const sqlCreate = generateCreateTableSQL(tableName, columnNames, dataTypes)

    // Connect to the database
    await client.connect();
    console.log('Connected to the database.');
    await client.query(`DROP TABLE IF EXISTS ${tableName}`)

    await client.query(sqlCreate);
    console.log('SQL command executed successfully.');

    const schemaQuery = `
    SELECT data_type
    FROM information_schema.columns
    WHERE table_name = $1
  `;

  // Execute the query to get schema information
  const result = await client.query(schemaQuery, [tableName]);
  const schema = result.rows;
  console.log('Schema result:', result.rows);

  const fields = columnNames.map((name:string, index:number) => ({
    name,
    type: format[index]
  }));



   let mockarooData = await fetchMockarooData(fields);

   const sqlInserts = mockarooData
   .replace(/insert into\s+\(/g, `insert into ${tableName} (`)
   .trim(); // Optionally trim leading/trailing whitespace

  //  await client.query(sqlInserts)

  return NextResponse.json({ message: `${sqlInserts}` });

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

    // Return an error response
    return NextResponse.json('Failed to execute SQL command', { status: 500 });
    
  } finally {
    // Close the database connection
    await client.end();
  }
}
