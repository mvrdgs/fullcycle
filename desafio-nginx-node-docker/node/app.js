const express = require('express');
const mysql = require('mysql2');
const bodyParser = require("body-parser");

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())

const PORT = 3000;

// docker container run --name mysql -e MYSQL_ROOT_PASSWORD=root -e MYSQL_USER=user -e MYSQL_PASSWORD=123456 -e MYSQL_DATABASE=fullcycle -p 3306:3306 -d mysql
const connection = mysql.createConnection({
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'fullcycle'
});

connection.connect((err) => {
if (err) throw err;
    console.log('Connected!');
});

connection.query(`CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);`)

app.get('/', (req, res) => {
    connection.query('SELECT name FROM users', (err, rows) => {
        if (err) throw err;

        const names = []

        console.log('print', rows);

        rows.forEach((row) => names.push(row.name));
        
        res.status(200).render("index", {
            names,
        })
    })
});

app.post('/', (req, res) => {
    console.log(req.body)
    const {name} = req.body;
    connection.query('INSERT INTO users (name) VALUES ?', [[[name]]], (err, resp) => {
        res.redirect("localhost:3000")
    });
});

app.listen(PORT, () => {
    console.log(`Running at port ${PORT}`);
});
