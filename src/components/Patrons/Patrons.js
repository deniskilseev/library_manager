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
    <table>
      <thead>
        <tr>
          <th>Login</th>
          <th>Last name</th>
          <th>First name</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key = {item.Login}>
            <td>{item.Login}</td>
            <td>{item.last_name}</td> 
            <td>{item.first_name}</td> 
          </tr>
        ))}
      </tbody>
    </table>
    {/* <NewPatronForm /> */}
    </div>
    );
}

export default Patrons;