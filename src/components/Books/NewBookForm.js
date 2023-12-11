import React, { useState } from 'react';

function NewBookForm() {
  const [formData, setFormData] = useState({ isbn: '', password: '', first: '', last: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5050/api/insert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Clear the form after successful submission
        setFormData({ title: '', author: '' });
      } else {
        console.error('Data insertion failed.');
      }
    } catch (error) {
      console.error(error);
    }
    window.location.reload();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="login">Login:</label>
        <input
          type="text"
          id="login"
          name="login"
          value={formData.login}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="password">password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="first">First name</label>
        <input
          type="text"
          id="first"
          name="first"
          value={formData.first}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="last">Last name</label>
        <input
          type="text"
          id="last"
          name="last"
          value={formData.last}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Insert Data</button>
    </form>
  );
}

export default NewPatronForm;
