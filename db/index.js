const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./db/library.db', sqlite3.OPEN_READWRITE, (err) => {
	if (err) {
		return console.error(err.message);
	}
	console.log('Connected to the Amberwood database.');
});

module.exports = db;
