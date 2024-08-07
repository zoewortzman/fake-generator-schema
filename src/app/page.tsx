'use client';
//import { sql } from "@vercel/postgres";
import Button from '../components/Button';
import Input from '../components/Input';
import Form from '../components/Form';
import {useState} from 'react';

export default function Home() {

    const [choices, setChoices] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [prompt, setPrompt] = useState("");

    return (
        <main>
            <h1 className= 'text-xl font-semibold text-blue-700'>Enter a promot for a new schema to get started</h1>
            <div>
                { /*<Input placeholder="Generate a schema for an e-commerce company's transaction table"/> */}
                <Form
                    onSubmit={async (prompt) => {
                        try {
                            const response = await fetch('/api/openAI', {
                                method: "POST",
                                headers : {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify({ prompt }),
                            })
                            if (!response.ok) {
                                throw new Error(`HTTP error! status: ${response.status}`);
                            }
                             const result = await response.json();
                            setChoices(result.choices)
                        } catch (error) {
                            console.error("Error fetching data:", error);
                        } finally {
                            setIsLoading(false);
                        }

                        }
                    }
                />
                { /* <Button label="Generate scheme"/> */}
                    
                    {choices.map(choice => {
                        console.log(choice)
                        return (
                            <p key={choice.index}> {choice.message.content}</p>
                        )
                    })}

                </div>
            <div>
            </div>
            
        </main>
    )

}

