import React, { useState, useEffect } from 'react';
import NewPatronForm from '../Patrons/NewPatronForm';
import './EditableTable.css'
const EditableTable = () => {

const [data, setData] = useState([]);
const [deletedData, setDeletedData] = useState([]);
const [editedData, setEditedData] = useState([]);


const handleSubmit = async () => {
    try {
      // Make a request to your server to update data in the SQL database
      // Example assuming you have an endpoint '/api/updateBooks'
      const response = await fetch('http://localhost:5050/api/updateUsers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log('Data successfully updated');
      } else {
        console.error('Failed to update data');
      }
    } catch (error) {
      console.error('Error updating data:', error);
    }
    console.log(deletedData);
    const response = await fetch('http://localhost:5050/api/deleteUsers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(deletedData),
      });
    
      window.location.reload();

  };

useEffect(() => {
    fetch('http://localhost:5050/api/users')
    .then((response) => response.json())
    .then((data) => setData(data))
    .catch((error) => console.error(error));
}, []);

// console.log(data);


const handleDeleteRow = (Login) => {
    const updatedData = data.filter((row) => row.Login !== Login);    
    setDeletedData([...deletedData, Login]);
    setData(updatedData);
};

const handleEdit = (Login, field, value) => {
    const updatedData = data.map((item) =>
      item.Login === Login ? { ...item, [field]: value } : item
    );
    setData(updatedData);
  };


  return (
    <div>
    <table>
      <thead>
        <tr>
          <th>Login</th>
          <th>Last Name</th>
          <th>First Name</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.Login}>
            <td>{item.Login ?? ''}</td>
            <td>
              <input
                type="text"
                value={item.last_name ?? ''}
                onChange={(e) => handleEdit(item.Login, 'last_name', e.target.value)}
              />
            </td>
            <td>
              <input
                type="text"
                value={item.first_name ?? ''}
                onChange={(e) => handleEdit(item.Login, 'first_name', e.target.value)}
              />
            </td>
            <td>
              <button onClick={() => handleDeleteRow(item.Login)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    <button onClick={handleSubmit}>Submit</button>
    <NewPatronForm />
    </div>
  );
};

export default EditableTable;
