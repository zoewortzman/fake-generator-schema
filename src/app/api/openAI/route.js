import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(request) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  // user input
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
Airport Code
Airport Name
App Bundle ID
Base64 Image URL
Car Make
City
Country
Country Code
Credit Card #
Credit Card Type
Dataset Column
Datetime
Drug Company
Drug Name (Brand)
Drug Name (Generic)
Email Address
Fake Company Name
Family Name (Chinese)
FDA NDC Code
File Name
First Name
First Name (Female)
First Name (Male)
Formula
Frequency
Full Name
Gender
Gender (abbrev)
Gender (Binary)
Gender (Facebook)
Geometric Distribution
Given Name (Chinese)
GUID
Hex Color
Job Title
Language
Last Name
Latitude
LinkedIn Skill
Movie Genres
Movie Title
Number
Phone
Product (Grocery)
Row Number
State
Stock Name
Stock Symbol
Street Address
Street Name
Street Number
Street Suffix
Time
URL
User Agent
Username
Words. 

Do not confuse format and datatype, they are different and must be chosen from their respentive lists. The format to return is 
Column names: []
Data types: []
Format: []. This output will be parsed in an API so do not alter it.
Name: this is the name of the sql table`,
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
