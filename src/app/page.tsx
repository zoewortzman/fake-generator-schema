"use client";

import Form from "../components/Form";
import TextEditor from "../components/SuggestedSchema";
import TableFromForm from "../components/TableFromForm";
import { useState } from "react";

export default function Home() {

  const [choices, setChoices] = useState<any[]>([]);
 
  return (
    <main className="ml-48 p-3 bg-slate-200">
      <div>
      <div className="bg-slate-700 text-white p-10 ">
        <p>Build a custom SQL table</p>
        
      </div>
      <div className="grid grid-cols-2">
        <div className="p-5 bg-gray-100 text-gray-800">
          <h1 className="text-xl font-semibold p-2">
            Start Building a table schema
            <TableFromForm/>
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
              <Form setChoices={setChoices}/>
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
            </div>
          </div>
        </div>
      </div>
      </div>
    </main>
  );
}
