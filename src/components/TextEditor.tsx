import { useState, useEffect } from 'react';

interface TextEditorProps {
  initialText: string;
}

const TextEditor: React.FC<TextEditorProps> = ({ initialText }) => {
  const [text, setText] = useState(initialText);

  useEffect(() => {
    setText(initialText);
  }, [initialText]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch('/api/submit-text', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });
  };

  return (
    <form className='flex items-center full rounded-lg bg-gray-100 p-3 w-25 p-5' onSubmit={handleSubmit}>
      <textarea className="grow bg-transparent text-wrap outline-none scroll-smooth" value={text} onChange={handleChange} rows={10} cols={50} />
    </form>

  );
};

export default TextEditor;
