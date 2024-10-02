import React, { useState } from "react";
import FakeDataTable from "./FakeDataTable";
import Modal from "./Modal";

interface TableField {
  name: string;
  dataFormat: string;
}

export default function TableFromForm() {
  const [tableName, setTableName] = useState("");
  const [tableFields, setTableFields] = useState<TableField[]>([
    { name: "", dataFormat: "" },
  ]);
  const [fakeData, setFakeData] = useState<any[]>([]);
  const [moreData, setMoreData] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState(false);

  const dataFormats = [
    "Airport Name",
    "Car Make",
    "Car Model",
    "City",
    "Color",
    "Company Name",
    "Country",
    "Country Code",
    "Credit Card #",
    "Credit Card Type",
    "Email Address",
    "First Name",
    "Last Name",
    "Gender",
    "GUID",
    "Job Title",
    "Movie Title",
    "Number",
    "Phone",
    "Postal Code",
    "Product (Grocery)",
    "State",
    "Street Address",
    "Datetime",
    "Time",
    "URL",
  ];

  const handleTableNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTableName(e.target.value);
  };

  const handleDone = () => {
    setTableName("");
    setFakeData([]);
    setTableFields([{ name: "", dataFormat: "" }]);
    setMoreData(false);
  };

  const addField = () => {
    const lastField = [...tableFields][tableFields.length - 1];
    if (lastField.name === "" || lastField.dataFormat === "") {
      alert("Finish adding column name or type from the previous row");
    } else {
      setTableFields([...tableFields, { name: "", dataFormat: "" }]);
    }
  };

  const deleteField = (
    e: React.MouseEvent<HTMLButtonElement>,
    index: number
  ) => {
    const updatedFields = [...tableFields];
    const newUpdatedFields = updatedFields.filter((name, i) => i !== index);

    setTableFields(newUpdatedFields);

    if (newUpdatedFields.length === 0) {
      setTableFields([{ name: "", dataFormat: "" }]);
    }
  };

  const handleFieldChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const updatedFields = [...tableFields];
    updatedFields[index] = { ...updatedFields[index], name: e.target.value };
    setTableFields(updatedFields);
  };

  const handleDataFormat = (
    e: React.ChangeEvent<HTMLSelectElement>,
    index: number
  ) => {
    const updatedFields = [...tableFields];
    updatedFields[index] = {
      ...updatedFields[index],
      dataFormat: e.target.value,
    };
    setTableFields(updatedFields);
  };

  const handleSubmit = async () => {
    const data = {
      tableName,
      tableFields,
    };

    console.log(data);
    const lastField = [...tableFields][tableFields.length - 1];
    if (lastField.name === "") {
      alert("Finish adding table fields or data types from the previous row");
      return;
    }

    if (tableName === "") {
      alert("Add a table name");
      return;
    }
    try {
      const response = await fetch("/api/create-table-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tableName, tableFields }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result: any = await response.json();
      setFakeData(result.data.rows);
    } catch (error) {
      console.error("Error submitting SQL command:", error);
      alert("Failed to execute SQL command");
    }
  };

  const handleGenerateMore = async () => {
    try {
      const response = await fetch("/api/create-table-form", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tableName, tableFields }),
      });
      const result: any = await response.json();
      setFakeData(result.data.rows);
      setMoreData(true);
    } catch (error) {
      console.error("Error submitting SQL command:", error);
      alert("Table may still be loading, try again in a minute!");
    }
  };

  return (
    <div>
      <div>
        <p className="pl-2 pt-10">Add a table name below:</p>
        <input
          className="flex items-center full outline-2 rounded-lg bg-gray-100 p-3 w-25 h-10 mt-2"
          type="text"
          value={tableName}
          onChange={handleTableNameChange}
          placeholder="Try a name like REVENUE"
        />
      </div>
      <div>
        <p className="pl-2 pt-10">Add table fields below:</p>
        {tableFields.map((field, index) => (
          <div key={index} className="p-2">
            <input
              type="text"
              value={field.name}
              placeholder="Column name"
              onChange={(e) => handleFieldChange(e, index)}
            />
            <select
              value={field.dataFormat}
              onChange={(e) => handleDataFormat(e, index)}
              className="outline-2 rounded-lg bg-gray-100 p-2 w-25 h-10 mt-2"
            >
              <option value="" disabled>
                Select a type
              </option>
              {dataFormats.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <button onClick={(e) => deleteField(e, index)} className="pl-2">
              Delete Field
            </button>
          </div>
        ))}
        <button className="pl-2 pt-1" onClick={addField}>
          Add Field
        </button>
      </div>
      <div className="pl-2">
        <button
          className="pl-2 pt-2 relative shadow-md bg-gray-800 py-2 px-4 shadow-gray-900/10 text-white"
          onClick={handleSubmit}
        >
          Create Table
        </button>
      </div>

      <Modal isOpen={fakeData.length > 0} onClose={() => setModalOpen(false)}>
        <button
          className="absolute top-5 right-2 p-2 bg-gray-100 rounded text-black hover:bg-gray-200"
          onClick={handleDone}
          disabled={moreData}
        >
          {" "}
          Close{" "}
        </button>
        <FakeDataTable
          fakeData={fakeData}
          tableName={tableName}
          handleGenerateMore={handleGenerateMore}
        />
      </Modal>
    </div>
  );
}
