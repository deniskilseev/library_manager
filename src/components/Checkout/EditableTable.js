import React, { useState, useEffect } from 'react';
import NewPatronForm from '../Patrons/NewPatronForm';
import './EditableTable.css'
const EditableTable = () => {

const [users, setUsers] = useState([]);
const [deletedUsers, setDeletedUsers] = useState([]);

const handleSubmit = async () => {
    try {
      // Request to updateUsers. Sends updated data.
      const response = await fetch('http://localhost:5050/api/updateUsers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(users),
      });

      if (response.ok) {
        console.log('Data successfully updated');
      } else {
        console.error('Failed to update data');
      }
    } catch (error) {
      console.error('Error updating data:', error);
    }

    // Submit also handles deleting users.
    const response = await fetch('http://localhost:5050/api/deleteUsers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(deletedUsers),
      });
    
      window.location.reload();

  };


// Request to fetch users.
useEffect(() => {
    fetch('http://localhost:5050/api/users')
    .then((response) => response.json())
    .then((users) => setUsers(users))
    .catch((error) => console.error(error));
}, []);


// When delete button is pressed, row is removed.
const handleDeleteRow = (Login) => {
    const updatedData = users.filter((row) => row.Login !== Login);    
    setDeletedUsers([...deletedUsers, Login]);
    setUsers(updatedData);
};

const handleEdit = (Login, field, value) => {
    const updatedData = users.map((item) =>
      item.Login === Login ? { ...item, [field]: value } : item
    );
    setUsers(updatedData);
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
        {users.map((item) => (
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
