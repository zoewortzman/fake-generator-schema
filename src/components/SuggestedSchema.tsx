import { useState, useEffect } from "react";

interface TextEditorProps {
  initialText: string;
}

interface ParsedData {
  columnNames: string[];
  dataTypes: string[];
  format: string[];
  tableName: string;
}

export default function TextEditor({ initialText }: TextEditorProps) {
  const [text, setText] = useState(initialText);
  const [schema, setSchema] = useState<any>(null);

  const parseData = (initialText: string): ParsedData => {
    const lines = initialText.split("\n").filter((line) => line.trim() !== "");

    const extractArrayFromLine = (line: string): string[] =>
      line
        .match(/\[(.*?)\]/)?.[1]
        .trim()
        .replace(/^"|"$/g, '') 
        .replace(/'/g, '') 
        .replace(/"/g, '') 
        .split(", ") || []; 

    const extractTableName = (line: string): string => {
      const parts = line.split(":");
      if (parts.length > 1) {
        const namePart = parts[1].trim();
        return namePart
          .replace(/^\[|\]$/g, "")
          .trim()
          .replace(/\s+/g, "_"); 
      }
      return "";
    };

    const columnNames = extractArrayFromLine(lines[0]);
    const dataTypes = extractArrayFromLine(lines[1]);
    const format = extractArrayFromLine(lines[2]);
    const tableName = extractTableName(lines[3]);

    return { columnNames, dataTypes, format, tableName };
  };

  const { columnNames, dataTypes, format, tableName } = parseData(initialText);

  const tableSchema = {
    columnNames,
    dataTypes,
    format,
    tableName
  };

  useEffect(() => {
    setText(initialText);
  }, [initialText]);

  const handleSubmit = async (e: React.FormEvent) => {
    console.log(tableSchema)
    e.preventDefault();

    // SQL command hard-coded in the component
    const sqlCommand = `DROP TABLE IF EXISTS accounting_data; CREATE TABLE accounting_data (transaction_id int, date date, description text, amount numeric, category text, account_id int);`
    // Call the backend server to execute the SQL command
    try {

      // Send SQL command to the Next.js API route
      const response = await fetch("/api/create-table", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tableSchema }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      alert(result.message);

      if (result.schema) {
        setSchema(result.schema);
        console.log(result.query)
        console.log(result.data);
      }
    } catch (error) {
      console.error("Error submitting SQL command:", error);
      alert("Failed to execute SQL command");
    }
  };

  const handleClear = () => {
    setText("");
    setSchema(null);
  };
  
  return (
    <div>
      {text !== "" && (
        <form
          className="flex flex-col items-start rounded-lg bg-gray-100 p-3 w-25 p-5"
          onSubmit={handleSubmit}
        >
          <label>{tableName}</label>
          <div className="overflow-x-auto mb-4">
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr>
                  <th className="border-b px-4 py-2">Column Name</th>
                  <th className="border-b px-4 py-2">Data Type</th>
                  <th className="border-b px-4 py-2">Format</th>
                </tr>
              </thead>
              <tbody>
                {columnNames.map((name, index) => (
                  <tr key={index}>
                    <td className="border-b px-4 py-2">{name}</td>
                    <td className="border-b px-4 py-2">{dataTypes[index]}</td>
                    <td className="border-b px-4 py-2">{format[index]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={handleClear}
              className="relative shadow-md bg-gray-800 py-2 px-4 shadow-gray-900/10 text-white"
            >
              Clear
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
