const express = require('express');
const mysql = require('mysql');

const app = express();


app.use(express.static('public'));

app.use(express.urlencoded({extended: false}));


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'MisakoAmane426',
    database: 'todoapp'
  });



app.get('/', (req, res) => {
    res.render('top.ejs');
});



app.get('/main', (req, res) => {
    connection.query(
        'SELECT * FROM lists',
        (error, results) => {
            res.render('main.ejs', {lists: results});
        }
    );
});



app.get('/new', (req, res) => {
    res.render('new.ejs');
});


app.post('/create', (req, res) => {
    connection.query(
        'INSERT INTO lists (name) VALUES (?)',
        [req.body.listName],
        (error, results) => {
            res.redirect('/main');
        }
    );
});


app.post('/delete/:id', (req, res) => {
    connection.query(
      'DELETE FROM lists WHERE id = ?',
      [req.params.id],
      (error, results) => {
         res.redirect('/main');
        }
    );
});


app.listen(3000);