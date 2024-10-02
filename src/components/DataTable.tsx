// Modal.tsx
import React from 'react';

interface Field {
  name: string;
  dataType: string;
  dataFormat: string;
}

interface dataTableProps {
  fakeData: {
    tableFields: Field[];
  };
}

export default function dataTable({fakeData }: dataTableProps) {

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <table>
          <thead>
            <tr>
              <th>Field Name</th>
              <th>Data Type</th>
              <th>Data Format</th>
            </tr>
          </thead>
          <tbody>
            {fakeData.tableFields.map((field, index) => (
              <tr key={index}>
                <td>{field.name}</td>
                <td>{field.dataType}</td>
                <td>{field.dataFormat}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

