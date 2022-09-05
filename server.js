const express = require('express');
const app = express();
const port = 8080;
const db = require('./db');
const cors = require('cors');
app.use(cors({
    origin: '*'
}));
app.use(cors({
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));

app.use(express.json());
app.use(express.urlencoded());

app.get('/books', (req, res) => {
	const sql = `
		SELECT * FROM books;
	`;
	const params = [];
  db.all(sql, params, (err, rows) => {
		if (err) {
			res.status(400).json({
				error: err.message
			});
			return;
		}
		res.json({
			message: 'success',
			data: rows
		});
	});
});

app.get('/books/genre/:genre', (req, res) => {
	let genre = req.params.genre.split('-').join(' ');
	const sql = `
		SELECT * FROM books
		WHERE genre = ?;
	`;
	const params = [genre];
  db.all(sql, params, (err, rows) => {
		if (err) {
			res.status(400).json({
				error: err.message
			});
			return;
		}
		res.json({
			message: 'success',
			data: rows
		});
	});
});

app.post('/books', (req, res) => {
	const params = [req.body.name, req.body.author, req.body.genre, req.body.price, req.body.image, req.body.description];
	const sql = `
		INSERT INTO BOOKS (name, author, genre, price, image, description) VALUES (?, ?, ?, ?, ?, ?);
	`;
	db.run(sql, params, function(err, result) {
		if (err) {
			res.status(400).json({
				error: err.message
			});
			return;
		}
		res.json({
			message: 'success',
			data: req.body,
			id: this.lastID
		});
	});
});

app.patch('/books/:id', (req, res) => {
	const params = [req.body.name, req.body.author, req.body.genre, req.body.price, req.body.image, req.body.description, req.body.id];
	const sql = `
		UPDATE BOOKS SET name = ?, author = ?, genre = ?, price = ?, image = ?, description = ? WHERE id = ?;
	`;
	db.run(sql, params, function(err, result) {
		if (err) {
			res.status(400).json({
				error: err.message
			});
			return;
		}
		res.json({
			message: 'success',
			data: req.body,
			id: this.lastID
		});
	});
});

app.delete('/books/:id', (req, res) => {
	const params = [req.params.id];
	const sql = `
		DELETE FROM BOOKS WHERE id = ?;
	`;
	db.run(sql, params, function(err, result) {
		if (err) {
			res.status(400).json({
				error: err.message
			});
			return;
		}
		res.json({
			message: 'success',
			data: req.body,
			id: this.lastID
		});
	});
});


app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
});