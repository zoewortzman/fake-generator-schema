import React, { useState } from "react";


function TableFromForm() {
  const [tableName, setTableName] = useState("");
  const [tableFields, setTableFields] = useState([{ name: "", dataType: "" }]);

  const sqlDataTypes = [
    "INT",
    "VARCHAR",
    "TEXT",
    "DATE",
    "FLOAT",
    "BOOLEAN",
    "CHAR",
    "DECIMAL",
    "TIMESTAMP",
    "BIGINT",
  ];

  const handleTableNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTableName(e.target.value);
  };

  const addField = () => {
    const lastField = [...tableFields][tableFields.length - 1];
    if (lastField.name === "" || lastField.dataType === "") {
      alert("Finish adding table fields or data types from the previous row");
    } else {
      setTableFields([...tableFields, { name: "", dataType: "" }]);
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
      setTableFields([{ name: "", dataType: "" }]);
    }
  };

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
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

  const handleSubmit = async () => {
    const lastField = [...tableFields][tableFields.length - 1];
    if (lastField.name === "" || lastField.dataType === "") {
      alert("Finish adding table fields or data types from the previous row");
      return;
    }

    if (tableName === "") {
      alert("Add a table name");
      return;
    }

    const tableString = tableFields.map(field => `${field.name} ${field.dataType}`).join(", ");

    const query = `CREATE TABLE ${tableName} (${tableString})`;

  //   try {
  //     const { data, error } = await supabase.rpc('execute_sql', {
  //       query
  //     });

  //     if (error) {
  //       throw error;
  //     }

  //     alert("Table created successfully");
  //   } catch (error) {
  //     console.error("Error creating table:", error);
  //     alert("Failed to create the table");
  //   }

  //   setTableFields([{ name: "", dataType: "" }]);
  // };

  return (
    <div>
      <div>
        <p className="pl-2  pt-10">Add a table name below:</p>
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
              className="ml-2 outline-2 rounded-lg bg-gray-100 p-2 w-25 h-10 mt-2"
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
            <button onClick={(e) => deleteField(e, index)} className="ml-2">
              Delete Field
            </button>
          </div>
        ))}
        <button className="pl-2 pt-1" onClick={addField}>
          Add Field
        </button>
      </div>
      <button className="pl-2 pt-10" onClick={handleSubmit}>
        Create Table
      </button>
    </div>
  );
}
}
export default TableFromForm;
