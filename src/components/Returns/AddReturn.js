import React, { useEffect, useState } from 'react';

function AddReturn() {
  const [formData, setFormData] = useState({ userLogin: '', librarianID: '', bookISBN: '', date: ''});
  const [returnBooks, setReturnBooks] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

  };
  
  useEffect(() => {
    fetch('http://localhost:5050/api/booksToReturn')
    .then((response) => response.json())
    .then((returnBooks) => setReturnBooks(returnBooks))
    .catch((error) => console.error(error));
  })

  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentDate = new Date();
    const formattedDateTime = currentDate.toISOString().slice(0, 19).replace('T', ' ');

    returnBooks.forEach((item) => {
        console.log(item, formData.bookISBN);
        if (item.ISBN == formData.bookISBN) {
            console.log("MATCH");
            formData.userLogin = item.userLogin;
        }
    });

    formData.date = formattedDateTime;
    
    try {
      const response = await fetch('http://localhost:5050/api/returnBook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Clear the form after successful submission
        setFormData({ userLogin: '', librarianID: '', bookISBN: '', date: ''});
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
        {returnBooks.map(item => (
          <option key = {item.ISBN} value={item.ISBN}>
            {item.Title} | ISBN: {item.ISBN} | User: {item.userLogin} | Date checked out: {item.date}
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
      <button type="submit">Checkout</button>
    </form>
  );
}

export default AddReturn;
