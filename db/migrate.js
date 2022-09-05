const db = require('./index.js');

db.serialize(() => {
	db.run(`
		create table books (
			id INTEGER PRIMARY KEY,
			name TEXT,
			author TEXT,
			genre TEXT,
			price DECIMAL,
            image TEXT,
            description TEXT
		);
	`)
});

db.close((err) => {
	if (err) {
		return console.error(err.message);
	}
	console.log('Close the database connection.');
});