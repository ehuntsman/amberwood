import React, { useEffect, useState } from 'react';
import { bookSelector } from '../../features/books/bookSlice';
import { useAppSelector } from '../../app/hooks';
import axios from 'axios';
import { Link } from "react-router-dom";
import '../../features/books/book.css';

export function Genre() {
  const [genre, setGenre] = useState('');
  const { books } = useAppSelector(bookSelector);
  const [booksByGenre, setBooksByGenre] = useState([]);

  useEffect(() => {
      // not the best way to do this
      let theme = window.location.pathname.split('/')[2];
      if(theme === "scifi") {
        theme = "Science Fiction";
      }else{
        theme = theme.charAt(0).toUpperCase() + theme.slice(1);
      }
      setGenre(theme);
      getBooksByGenre(theme);
  }, []);
    
    async function getBooksByGenre(genre: string) {
      try {
        let apiGenre = genre.split(' ').join('-');
        const { data } = await axios.get(`/books/genre/${apiGenre}`);  
        setBooksByGenre(data.data);
        return data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log('error message: ', error.message);
          return error.message;
        } else {
          console.log('unexpected error: ', error);
          return 'An unexpected error occurred';
        }
      }
    }

  return (
    <div className="container">
      <h1>{genre}</h1>
      <div className="books-container">
        {booksByGenre[0] && booksByGenre.map(({id, image, name, author}: any) => {
          const title = name.split(' ').join('-');
          return (
            <Link to={`/books/${id}`} key={id} className="book-box">
              <img src={image} alt={name} />
              <h4>{name}</h4>
              <h6>{author}</h6>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
