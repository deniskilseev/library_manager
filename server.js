const express = require('express');
const sqlite3 = require('sqlite3');
const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:false,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

const app = express();
app.use(cors(corsOptions)) // Use this after the variable declaration
const port = 5050;

app.use(cors());
app.use(express.json());

const db = new sqlite3.Database('db.sqlite');

// Example endpoint to fetch data from the SQLite database
app.get('/api/users', (req, res) => {
  db.all('SELECT * FROM User', (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.json(rows);
  });
});

// API to get all books
app.get('/api/books', (
  req, res) => {
  db.all('SELECT * FROM Book', (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.json(rows);
  });
});

app.get('/api/checkouts', (
  req, res) => {
  db.all('SELECT * FROM Checkout', (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.json(rows);
  });
});

app.get('/api/availableBooks', (
  req, res) => {
  db.all('SELECT * FROM AvailableBooks', (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.json(rows);
  });
});

app.get('/api/booksToReturn', (
  req, res) => {
  db.all('SELECT * FROM BooksToReturn', (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.json(rows);
  });
});

app.get('/api/returns', (
  req, res) => {
  db.all('SELECT * FROM Return', (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.json(rows);
  });
});

app.get('/api/autors', (
  req, res) => {
  db.all('SELECT * FROM AuthorInfo', (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.json(rows);
  });
});

// API endpoint to update Users 
app.post('/api/report', (req, res) => {
  const {table, user} = req.body;
  const query = `SELECT * FROM ${table} WHERE userLogin = '${user}'`;
  console.log(query);
  db.all(query, (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.json(rows);
  });
});

// API endpoint to insert User
app.post('/api/insertUser', (req, res) => {
  const { Login, password, first, last } = req.body;

  db.run('INSERT INTO User (Login, password, first_name, last_name) VALUES (?, ?, ?, ?)', [Login, password, first, last], function (err) {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to insert data' });
      return;
    }
    res.json({ message: 'Data inserted successfully', lastID: this.lastID });
  });
});

// API endpoint to insert User
app.post('/api/checkoutBook', (req, res) => {
  const { userLogin, librarianID, bookISBN, date } = req.body;
  console.log(req.body);
  db.run('INSERT INTO Checkout (userLogin, librarianID, bookISBN, date) VALUES (?, ?, ?, ?)', [userLogin, librarianID, bookISBN, date], function (err) {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to insert data' });
      return;
    }
    res.json({ message: 'Data inserted successfully', lastID: this.lastID });
  });
});

// API endpoint to insert User
app.post('/api/returnBook', (req, res) => {
  const { userLogin, librarianID, bookISBN, date } = req.body;
  console.log(req.body);
  db.run('INSERT INTO Return (userLogin, librarianID, bookISBN, date) VALUES (?, ?, ?, ?)', [userLogin, librarianID, bookISBN, date], function (err) {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to insert data' });
      return;
    }
    res.json({ message: 'Data inserted successfully', lastID: this.lastID });
  });
});


// API endpoint to update Users 
app.post('/api/updateUsers', (req, res) => {
  const updatedData = req.body;
  db.run('BEGIN TRANSACTION')
  updatedData.forEach((item) => {
    const { Login, last_name, first_name } = item;
    db.run(
      'UPDATE User SET last_name = ?, first_name = ? WHERE Login = ?',
      [last_name, first_name, Login],
      (err) => {
        if (err) {
          db.run('ROLLBACK');
          console.error('Error updating data:', err);
        }
      }
    );
  });
  db.run('COMMIT')
  res.json({ message: 'Data updated successfully' });
});


// API endpoint to delete Users
app.post('/api/deleteUsers', (req, res) => {
  const updatedData = req.body;
  console.log(req.body);
  db.run('BEGIN TRANSACTION')
  updatedData.forEach((item) => {
    const Login = item;
    db.run(
      'DELETE FROM User WHERE Login = ?',
      [Login],
      (err) => {
        if (err) {
          db.run('ROLLBACK');
          console.error('Error updating data:', err);
        }
      }
    );
  });
  db.run('COMMIT')
  res.json({ message: 'Data updated successfully' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});