import React, {useEffect, useState } from 'react';

const Report = () => {

const [selectedTable, setSelectedTable] = useState('');
const [users, setUsers] = useState([]);
const [selectedUser, setSelectedUser] = useState('');
const [responseData, setResponseData] = useState(['']);

const handleChangeA = (event) => {
    setSelectedTable(event.target.value);
  };

const handleChangeB = (event) => {
    setSelectedUser(event.target.value);
};

useEffect(() => {
    fetch('http://localhost:5050/api/users')
      .then((response) => response.json())
      .then((users) => setUsers(users))
      .catch((error) => console.error(error));
  }, []);

useEffect(() => {
const fetchData = async () => {
    try {
    const response = await fetch('http://localhost:5050/api/report', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            table: "Report",
            user: "numbabumba",
        }),
    });
        const result = await response.json();
        setResponseData(result);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

fetchData();
}, []);

useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5050/api/report', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            table: selectedTable,
            user: selectedUser,
          }),
        });
        const result = await response.json();
        setResponseData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [selectedTable, selectedUser]);


  console.log(responseData);

  return (
    <div>
      <label htmlFor="dropdown">Select a table:</label>
      <select id="dropdown" value={selectedTable} onChange={handleChangeA}>
        <option value="">Select an option</option>
        <option value="Return">Return</option>
        <option value="Checkout">Checkout</option>
      </select>
      <p>You selected table: {selectedTable}</p>

      <div>
      <label htmlFor="Login">Select a user:</label>
      <select name = "Login" id="Login" value = {selectedUser} onChange={handleChangeB}>
        <option value="">Select an item</option>
        {users.map(item => (
          <option key = {item.Login} value={item.Login}>
            {item.Login}
          </option>
        ))}
      </select>
      <p>You selected user: {selectedUser} </p>
      </div>

      <h2>Fetch for {selectedTable} and {selectedUser} </h2>
    <table>
      <thead>
        <tr>
          <th>Book's ISBN</th>
          <th>Librarian's ID</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
      {responseData.length > 0 && responseData.map((item) => (
  <tr key={item.ISBN}>
    <td>{item.bookISBN}</td>
    <td>{item.librarianID}</td>
    <td>{item.date}</td>
  </tr>
))}
      </tbody>
    </table>
    </div>
  );
};

export default Report;
