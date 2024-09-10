import {useState} from 'react';

interface FormProps{
    setChoices:any
    
}

export default function Form( {setChoices}: FormProps) {
    const [prompt, setPrompt] = useState("");
    const [isLoading, setIsLoading] = useState(false)
    
    return (
        <div className="relative">
            <form className = "flex items-center full rounded-lg bg-gray-100 p-3 w-25 h-20 p-5" onSubmit={ async (e) => {
            console.log(e)
            e.preventDefault();
            // use value entered to call openAI API
            if (prompt ==="") {
                return;
            }
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
                }
            setPrompt("");
        }}>
            <textarea className = "grow bg-transparent text-wrap outline-none scroll-smooth" value={prompt} placeholder='Create a schema for an e-commerce company for a transactions tables' onChange={ e => {
                setPrompt(e.target.value)
            }}/>
            <div className='relative shadow-md bg-gray-800 py-2 px-4 shadow-gray-900/10 text-white'>
                <input type= "submit"/>
            </div>
            
        </form>

        </div>
        
    )
}