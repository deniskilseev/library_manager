const express = require('express');
const sqlite3 = require('sqlite3');
const cors = require('cors');
const app = express();

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

app.get('/api/books', (req, res) => {
  db.all('SELECT * FROM Book', (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.json(rows);
  });
});

// API endpoint to insert data
app.post('/api/insert', (req, res) => {
  const { login, password, first, last } = req.body;

  db.run('INSERT INTO User (login, password, First_name, Last_name) VALUES (?, ?, ?, ?)', [login, password, first, last], function (err) {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to insert data' });
      return;
    }

    res.json({ message: 'Data inserted successfully', lastID: this.lastID });
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
