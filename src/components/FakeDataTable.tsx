import React from "react";

interface FakeDataTableProps {
  fakeData: any[];
  tableName: string;
  handleGenerateMore: () => Promise<void>;
}

export default function FakeDataTable({
  fakeData,
  tableName,
  handleGenerateMore,
}: FakeDataTableProps) {


  const handleDownload = async () => {
    try {
      const response = await fetch("/api/download-table", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tableName: tableName }),
      });
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${tableName}.csv`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url); 
    } catch (error) {
      console.error(error);
      alert("Failed to execute SQL command");
    }
  };

  return (
    <div className="pt-10">
      <label className="text-lg font-semibold text-gray-700 mb-2 block">{tableName}</label>
      <table>
        <thead className="table-auto ">
          <tr>
            {fakeData.length > 0 &&
              Object.keys(fakeData[0]).map((header) => (
                <th
                  className="border-b px-4 py-2 bg-white font-bold"
                  key={header}
                >
                  {header}
                </th>
              ))}
          </tr>
        </thead>
        <tbody>
          {fakeData.map((item, index) => (
            <tr key={index}>
              {Object.keys(item).map((key) => (
                <td
                  className="border-b px-4 py-2 bg-white font-light"
                  key={key}
                >
                  {item[key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <button className="px-2" onClick={handleGenerateMore}>
        Add 100 more rows
      </button>
      <button className="px-2" onClick={handleDownload}>
        Download CSV
      </button>
    </div>
  );
}
