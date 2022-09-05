import React, { useEffect, useState } from 'react';
import { bookSelector, Book } from '../../features/books/bookSlice';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { Link } from "react-router-dom";
import {useSelector} from 'react-redux';

export function Books() {
  const dispatch = useAppDispatch();
  const { books, isLoading, error } = useAppSelector(bookSelector);

  return (
    <div>
      <h1 className="page-title">All Books</h1>
      <div className="books-container">
        {books[0] && books.map(({id, image, name, genre, author}: any) => {
          // const title = name.split(' ').join('-');
          return (
            <Link to={`/books/${id}`} key={id} className="book-box">
              <img src={image} alt={name} />
              <p>{name}</p>
              <h5>{author}</h5>
              <h6>{genre}</h6>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
