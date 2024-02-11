import React, {useEffect, useState} from 'react';

function Books() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5050/api/books')
          .then((response) => response.json())
          .then((data) => setData(data))
          .catch((error) => console.error(error));
      }, []);

    console.log(data);
    return (
    <div>
    <h2>Books</h2>
    <table>
      <thead>
        <tr>
          <th>ISBN</th>
          <th>Title</th>
          <th>Genre</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key = {item.ISBN}>
            <td>{item.ISBN}</td> 
            <td>{item.Title}</td> 
            <td>{item.Genre}</td> 
          </tr>
        ))}
      </tbody>
    </table>
    </div>
    );
}

export default Books;