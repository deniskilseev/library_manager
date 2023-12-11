import React, { useEffect, useState } from 'react';

function AddCheckout() {
  const [formData, setFormData] = useState({ userLogin: '', librarianID: '', bookISBN: '', date: ''});
  const [availableBooks, setAvailableBooks] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setFormData({
      ...formData,
      [name]: value,
    });
    console.log(formData);
  };

  useEffect(() => {
    fetch('http://localhost:5050/api/availableBooks')
    .then((response) => response.json())
    .then((availableBooks) => setAvailableBooks(availableBooks))
    .catch((error) => console.error(error));
  })

  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentDate = new Date();
    const formattedDateTime = currentDate.toISOString().slice(0, 19).replace('T', ' ');

    formData.date = formattedDateTime;

    console.log(formData);
    try {
      const response = await fetch('http://localhost:5050/api/checkoutBook', {
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
      <label htmlFor="bookISBN">Select a book:</label>
      <select name = "bookISBN" id="bookISBN" value = {formData.bookISBN} onChange={handleChange}>
        <option value="">Select an item</option>
        {availableBooks.map(item => (
          <option key = {item.ISBN} value={item.ISBN}>
            {item.Title} | ISBN: {item.ISBN}
          </option>
        ))}
      </select>
      </div>
      <div>
        <label htmlFor="librarianID">LibrarianID</label>
        <input
          type="text"
          id="text"
          name="librarianID"
          value={formData.librarianID}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="userLogin">User</label>
        <input
          type="text"
          id="first"
          name="userLogin"
          value={formData.userLogin}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Checkout</button>
    </form>
  );
}

export default AddCheckout;
