import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(request) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const params = await request.json();

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: `Use postgres SQL create syntax to create a schema, complete with field names, data types, data descriptions, and a table name. Return the results that best fit the description in three arrays: The first array is the column names that will be displayed on the table there should be no spaces in the descriptions, only underscores. The second array is the data types as would be used in a sql query they must be chosen from this list: 
            int
            float
            numeric
            json
            jsonb
            text
            varchar(255)
            uuid
            date
            time
            timetz
            timestamp
            tampstampz
            bool. The third array is a description of the data, such as first name, or country. Format must be selected from this list below:
    Airport Name,
    Car Make,
    Car Model,
    City,
    Color,
    Company Name,
    Country,  
    Country Code,
    Credit Card #,
    Credit Card Type,
    Email Address,
    First Name,
    Last Name,
    Gender,
    GUID,
    Job Title,
    Movie Title,
    Number,
    Phone,
    Postal Code,
    Product (Grocery),
    State,
    Street Address,
    Datetime,
    Time,
    URL,

The format to return is 
Column names: []
Data types: []
Format: []. 
Name: this is the name of the sql table

This output will be parsed in an API so do not alter it.`,
      },
      {
        role: "user",
        content: params.prompt,
      },
    ],
    temperature: 0,
    max_tokens: 1024,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  return NextResponse.json(response);
}
