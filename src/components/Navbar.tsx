"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [tableNames, setTableNames] = useState<string[]>([]);

  useEffect(() => {
    const fetchTableNames = async () => {
      try {
        const response = await fetch("/api/fetch-tables", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result: { message: string; data: { table_name: string }[] } = await response.json();

        console.log("Fetched table names:", result);
        if (result.message) {
        const names = result.data.map(table => table.table_name);

          setTableNames(names); 
        }
      } catch (error) {
        console.error("Error fetching table names:", error);
        alert("Failed to fetch table names");
      }
    };

    fetchTableNames();
  }, []);

  return (
    <nav className="fixed top-0 left-0 h-screen w-48 bg-white border-r border-gray-200">
      <div className="h-[120px] bg-slate-200"></div>
<div>
        <div className="w-[10px] bg-slate-200"></div>
        
        <p className="text-black mt-4">Created tables</p>

        {tableNames.map((name, index) => (
          <div key={index} className="relative pt-2">
          <Link href={`/tables/${name}`} className="block ml-4 px-4 py-2 bg-gray-100 rounded text-black hover:bg-gray-200">
            {name}
          </Link>
        </div>
        ))}
      </div>
    </nav>
  );
}
