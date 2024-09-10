import { useState, useEffect } from 'react';

interface TextEditorProps {
  initialText: string;
}

export default function TextEditor({ initialText }: TextEditorProps) {

  const [text, setText] = useState(initialText);
  const [schema, setSchema] = useState<any>(null);


  useEffect(() => {
    setText(initialText);
  }, [initialText]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // SQL command hard-coded in the component
    const sqlCommand = `
      CREATE TABLE IF NOT EXISTS test_schema2 (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        price DECIMAL(10, 2) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

  // Call the backend server to execute the SQL command
  try {
    // Send SQL command to the Next.js API route
    const response = await fetch('/api/create-table', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ sqlCommand }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const result = await response.json();
    alert(result);

    if (result.schema) {
      setSchema(result.schema);
      console.log(result.schema)
    }

  } catch (error) {
    console.error('Error submitting SQL command:', error);
    alert('Failed to execute SQL command');
  }
};

  return (
    <form
      className="flex items-center full rounded-lg bg-gray-100 p-3 w-25 p-5"
      onSubmit={handleSubmit}
    >
      <textarea
        className="grow bg-transparent text-wrap outline-none scroll-smooth"
        value={text}
        onChange={handleChange}
        rows={10}
        cols={50}
      />
      <div className="relative shadow-md bg-gray-800 py-2 px-4 shadow-gray-900/10 text-white">
        <button type="submit">
          Generate fake data
        </button>
      </div>
    </form>
  );
}
