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
    <ul>
        {data.map((item) => (
          <li key={item.id}> {item.ISBN} <b>Title</b> {item.Title} <b>Genre:</b> {item.Genre} {}</li>
        ))}
      </ul>
    </div>
    );
}

export default Books;