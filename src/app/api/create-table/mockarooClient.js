import * as dotenv from 'dotenv';
import Mockaroo from 'mockaroo';

// Load environment variables from .env file
dotenv.config();

// Retrieve API key from environment variables
const apiKey = process.env.MOCKAROO_API_KEY;

if (!apiKey) {
  throw new Error('MOCKAROO_API_KEY is not defined in the environment variables');
}

// Initialize Mockaroo client with the API key from environment variables
const client = new Mockaroo.Client({
  apiKey: apiKey,
});

async function generateData() {
  try {
    const records = await client.generate({
      count: 10,
      fields: [
        {
          name: 'id',
          type: 'Row Number',
        },
        {
          name: 'transactionType',
          type: 'Custom List',
          values: ['credit', 'debit'],
        },
      ],
    });

    console.log('Generated Records:', records);
    return records;
  } catch (error) {
    console.error('Error generating data:', error);
    throw error;
  }
}

// Call the function to generate data
generateData();
