"use client";
//import { sql } from "@vercel/postgres";
import Button from "../components/Button";
//import Input from "../components/Input";
import Form from "../components/Form";
import TextEditor from "@/components/TextEditor";
import ParseText from "@/components/ParseText";
import { useState } from "react";

export default function Home() {
  const [choices, setChoices] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [prompt, setPrompt] = useState("");
  const sqlSchema = `CREATE TABLE ecommerce (
    transaction_id SERIAL PRIMARY KEY,
    customer_id INT,
    product_id INT,
    quantity INT,
    total_amount DECIMAL(10, 2),
    transaction_date DATE
`;

  return (
    <main>
      <div className="bg-slate-700 text-white p-10">
        <p>Build a custom SQL table</p>
      </div>
      <div className="grid grid-cols-2">
        <div className="p-5 bg-gray-100 text-gray-800">
          <h1 className="text-xl font-semibold p-2">
            Start Building a table schema
          </h1>
          
        </div>

        <div className="bg-slate-400 h-dvh p-5">
          <div>
            <h1 className="text-xl font-semibold text-blue-700 p-2">
              Need help creating a scehma?
            </h1>
            <p className="text-blue-700 p-2">
              {" "}
              Describe your table's use case below for some suggestions.
            </p>

            <div className="p-2 pr-10">
              <Form
                onSubmit={async (prompt) => {
                  try {
                    const response = await fetch("/api/openAI", {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({ prompt }),
                    });
                    if (!response.ok) {
                      throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    const result = await response.json();
                    setChoices(result.choices);
                  } catch (error) {
                    console.error("Error fetching data:", error);
                  } finally {
                    setIsLoading(false);
                  }
                }}
              />

              <div className="pt-10 ">
                {choices.map((choice) => {
                  console.log(choice);
                  return (
                    <TextEditor
                      key={choice.index}
                      initialText={choice.message.content}
                    />
                  );
                })}
              </div>

              {/* <Button label="Generate scheme"/> */}
            </div>
          </div>

          {/*<Input placeholder="Generate a schema for an e-commerce company's transaction table"/> */}
        </div>
      </div>
    </main>
  );
}
