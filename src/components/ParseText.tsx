// const sqlSchema = `
// CREATE TABLE ecommerce.transactions (
//     transaction_id SERIAL PRIMARY KEY,
//     customer_id INT,
//     product_id INT,
//     quantity INT,
//     total_amount DECIMAL(10, 2),
//     transaction_date DATE
// `;
// // parseSqlSchema.ts

export default function ParseText({
  schema,
} :{
  schema: String;
}) {
  const tableNameMatch = schema.match(/CREATE TABLE `(\w+)`/);
  if (!tableNameMatch) {
    return null;
  }
  const tableName = tableNameMatch[1];

  const columnMatches = schema.match(/`(\w+)` [^,]+/g);
  if (!columnMatches) {
    return null;
  }

  const columns = columnMatches.map(col => col.match(/`(\w+)`/)![1]);

  //return { schema, tableName, columns };
  return (
    <div>
      <p>
        {tableName}, {columns}
      </p>
    </div>
  )
}
