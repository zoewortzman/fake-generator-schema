import React, { useState} from "react";
import FakeDataTable from './FakeDataTable'
import Modal from './Modal'

interface TableField {
  name: string;
  dataType: string;
  dataFormat: string;
}

export default function TableFromForm() {
  const [tableName, setTableName] = useState("");
  const [tableFields, setTableFields] = useState<TableField[]>([
    { name: "", dataType: "", dataFormat: "" },
  ]);
  const [fakeData, setFakeData] = useState([]);
  const [moreData, setMoreData] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState(false);

  const sqlDataTypes = [
    "int",
    "float",
    "numeric",
    "json",
    "jsonb",
    "text",
    "varchar(255)",
    "uuid",
    "date",
    "time",
    "timetz",
    "timestamp",
    "tampstampz",
    "bool",
  ];

  const dataFormats = [
    "Base64 Image URL",
    "Airport Name",
    "Base64 Image URL",
    "Car Make",
    "Car Model",
    "City",
    "Color",
    "Company Name",
    "Country",
    "Country Code",
    "Credit Card #",
    "Credit Card Type",
    "First Name",
    "Last Name",
    "Gender",
    "Job Title",
    "JSON Array",
    "Movie Title",
    "Number",
    "Phone",
    "Postal Code",
    "State",
    "Time",
    "URL"
  ];

  const handleTableNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTableName(e.target.value);
  };

  const handleDone= () => {
    setTableName("");
    setFakeData([])
    setTableFields([
      { name: "", dataType: "", dataFormat: "" },
    ])
  };

    
  const addField = () => {
    const lastField = [...tableFields][tableFields.length - 1];
    if (lastField.name === "" || lastField.dataType === "") {
      alert("Finish adding table fields or data types from the previous row");
    } else {
      setTableFields([
        ...tableFields,
        { name: "", dataType: "", dataFormat: "" },
      ]);
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
      setTableFields([{ name: "", dataType: "", dataFormat: "" }]);
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

  const handleDataType = (
    e: React.ChangeEvent<HTMLSelectElement>,
    index: number
  ) => {
    const updatedFields = [...tableFields];
    updatedFields[index] = {
      ...updatedFields[index],
      dataType: e.target.value,
    };
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
    if (lastField.name === "" || lastField.dataType === "") {
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
        body: JSON.stringify({ tableName }),
      });
      const result: any = await response.json();
      setFakeData(result.data.rows);
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
              placeholder="field"
              onChange={(e) => handleFieldChange(e, index)}
            />
            <select
              value={field.dataType}
              onChange={(e) => handleDataType(e, index)}
              className=" outline-2 rounded-lg bg-gray-100 p-2 w-25 h-10 mt-2"
            >
              <option value="" disabled>
                Select a type
              </option>
              {sqlDataTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <select
              value={field.dataFormat}
              onChange={(e) => handleDataFormat(e, index)}
              className="ml-2 outline-2 rounded-lg bg-gray-100 p-2 w-25 h-10 mt-2"
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

            <button onClick={(e) => deleteField(e, index)} className="pt-2">
              Delete Field
            </button>
          </div>
        ))}
        <button className="pl-2 pt-1" onClick={addField}>
          Add Field
        </button>
      </div>
      <button className="pl-2 pt-2 relative shadow-md bg-gray-800 py-2 px-4 shadow-gray-900/10 text-white" onClick={handleSubmit}>
        Create Table
      </button>

      <Modal isOpen={fakeData.length > 0} onClose={() => setModalOpen(false)}>
        <FakeDataTable 
          fakeData={fakeData}
          tableName={tableName}
          handleGenerateMore={handleGenerateMore}
        />
        <button className="p-2  bg-gray-100 rounded text-black hover:bg-gray-200" onClick={handleDone}> Close </button>
      </Modal>

    </div>
  );
}
