import React, {useEffect, useState} from 'react';
import AddReturn from './AddReturn.js'

function Returns() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5050/api/returns')
          .then((response) => response.json())
          .then((data) => setData(data))
          .catch((error) => console.error(error));
      }, []);

    console.log(data);

    return (
    <div>
    <h2>Returns</h2>
    <AddReturn />
    <table>
      <thead>
      <tr>
          <th>User</th>
          <th>Librarian</th>
          <th>ISBN</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key = {`${item.librarianID}-${item.bookISBN}-${item.date}`}>
            <td>{item.userLogin}</td>
            <td>{item.librarianID}</td> 
            <td>{item.bookISBN}</td> 
            <td>{new Date(item.date).toLocaleString()}</td> 
          </tr>
        ))}
      </tbody>
    </table>

    </div>
    );
}

export default Returns;