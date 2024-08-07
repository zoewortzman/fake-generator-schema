import {useState} from 'react';

interface FormProps {
    onSubmit: (prompt:string) => void;
  }

export default function Form({onSubmit}:FormProps) {
    const [prompt, setPrompt] = useState("");
    return (
        <form onSubmit={ async (e) => {
            e.preventDefault();
            // use value entered to call openAI API
            if (prompt ==="") {
                return;
            }
            onSubmit(prompt)
            setPrompt("");
        }}>
            <label>
                Question
            </label>
            <input type="text" value={prompt} onChange={ e => {
                setPrompt(e.target.value)
            }}/>
            <input type="submit"/>
        </form>
    )
}