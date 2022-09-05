const db = require('./index.js');

db.serialize(() => {
	db.exec(`
        delete from books;
        delete from users;

        insert into books (id, name, author, genre, price, image, description) values (1, 'The Hobbit', 'J.R.R. Tolkien', 'Fantasy', 10.99, 'https://covers.openlibrary.org/b/id/10293565-L.jpg', 'The Hobbit, or There and Back Again is a children''s fantasy novel by English author J. R. R. Tolkien. It was published on 21 September 1937 to wide critical acclaim, being nominated for the Carnegie Medal and awarded a prize from the New York Herald Tribune for best juvenile fiction.');
        insert into books (id, name, author, genre, price, image, description) values (2, 'The Fellowship of the Ring', 'J.R.R. Tolkien', 'Fantasy', 10.99, 'https://covers.openlibrary.org/b/id/8172085-L.jpg', 'The Fellowship of the Ring is the first volume of J. R. R. Tolkien''s epic high fantasy The Lord of the Rings. It is followed by The Two Towers and The Return of the King.');
        insert into books (id, name, author, genre, price, image, description) values (3, 'The Two Towers', 'J.R.R. Tolkien', 'Fantasy', 10.99, 'https://covers.openlibrary.org/b/id/11996846-L.jpg', 'The Two Towers is the second volume of J. R. R. Tolkien''s epic high fantasy The Lord of the Rings. It is preceded by The Fellowship of the Ring and followed by The Return of the King.');
        insert into books (id, name, author, genre, price, image, description) values (4, 'The Return of the King', 'J.R.R. Tolkien', 'Fantasy', 10.99, 'https://covers.openlibrary.org/b/id/12449379-L.jpg', 'The Return of the King is the third and final volume of J. R. R. Tolkien''s epic high fantasy The Lord of the Rings. It is preceded by The Two Towers and followed by The Return of the King.');

	`);
});

db.close((err) => {
	if (err) {
		return console.error(err.message);
	}
	console.log('Close the database connection.');
});