import React, {useState, useEffect} from 'react';
import NewPatronForm from '../Patrons/NewPatronForm.js'

function Patrons() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5050/api/users')
          .then((response) => response.json())
          .then((data) => setData(data))
          .catch((error) => console.error(error));
      }, []);

    console.log(data);
    return (
    <div>
    <h2>Patrons</h2>
    <ul>
        {data.map((item) => (
          <li key={item.Login}> {item.First_name}  {item.Last_name} {}</li>
        ))}
      </ul>
    <NewPatronForm />
    </div>
    );
}

export default Patrons;