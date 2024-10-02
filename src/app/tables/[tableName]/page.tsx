'use client'
import Link from 'next/link';
import { useEffect, useState } from 'react';
import FakeDataTable from '../../../components/FakeDataTable';

interface DisplayTableProps {
  params: {
    tableName: string;
  };
}

export default function DisplayTable({ params }: DisplayTableProps) {
    const [fakeData, setFakeData] = useState([]);
    const tableName = params.tableName;

      const handleGenerateMore = async () => {
        try {
          const response = await fetch("/api/create-table-form", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ tableName }),
          });
          const result: any = await response.json();
          setFakeData(result.data.rows);
        } catch (error) {
          console.error("Error submitting SQL command:", error);
          alert("Table may still be loading, try again in a minute!");
        }
       
      };
    
      useEffect(() => {
        const fetchTable = async () => {
          try {
            const response = await fetch("/api/load-tables", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ tableName }),
            });
            const result: any = await response.json();
            console.log("Fetched table:", result);
            if (result.data?.rows) {
              setFakeData(result.data.rows);
            } else {
              console.warn("No rows found in the response:", result);
            }
          } catch (error) {
            console.error("Error fetching table", error);
          }
        };
        fetchTable();
      }, [tableName]); 
      
  const handleDelete = async () => {
    try {
      const response = await fetch("/api/delete-table", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tableName }),
      });
      const result: any = await response.json();
    } catch (error) {
      console.error("Table not deleted", error);
    }
  };

  return (
    <main>
      <div className="ml-48 p-8">
        <div className='pl-200'>
          <Link href={`/`} className="px-4 py-2 bg-gray-100 rounded text-black hover:bg-gray-200">Home</Link>
        <FakeDataTable 
          fakeData={fakeData}
          tableName={tableName}
          handleGenerateMore={handleGenerateMore}/>
          <div className='pt-4'>
          <Link onClick={handleDelete} href={`/`} className="px-4 py-2 bg-gray-100 rounded text-black hover:bg-gray-200">
            Delete Table
          </Link>
          </div>

        </div>
      </div>
    </main>
  );
}
