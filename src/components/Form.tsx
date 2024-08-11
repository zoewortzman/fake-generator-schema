import {useState} from 'react';

interface FormProps {
    onSubmit: (prompt:string) => void;
  }

export default function Form({onSubmit}:FormProps) {
    const [prompt, setPrompt] = useState("");
    return (

        <div className="relative">
            <form className = "flex items-center full rounded-lg bg-gray-100 p-3 w-25 h-20 p-5" onSubmit={ async (e) => {
            e.preventDefault();
            // use value entered to call openAI API
            if (prompt ==="") {
                return;
            }
            onSubmit(prompt)
            setPrompt("");
        }}>
            <textarea className = "grow bg-transparent text-wrap outline-none scroll-smooth" value={prompt} placeholder='Create a schema for an e-commerce company for a transactions tables' onChange={ e => {
                setPrompt(e.target.value)
            }}/>
            <div className='relative shadow-md bg-gray-800 py-2 px-4 shadow-gray-900/10 text-center align-middle text-white'>
                <input type= "submit"/>
            </div>
            
        </form>

        </div>
        
    )
}