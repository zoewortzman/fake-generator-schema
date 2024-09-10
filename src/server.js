const express = require('express');
const { Client } = require('pg');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3001; // Choose an available port

// PostgreSQL connection configuration
const client = new Client({
  connectionString: 'postgres://username:password@hostname:port/database',
});

app.use(cors());
app.use(bodyParser.json());

app.post('/execute-sql', async (req, res) => {
  const { sqlCommand } = req.body;

  try {
    await client.connect();
    await client.query(sqlCommand);
    res.status(200).send('SQL command executed successfully');
  } catch (error) {
    console.error('Error executing SQL command:', error);
    res.status(500).send('Error executing SQL command');
  } finally {
    await client.end();
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
