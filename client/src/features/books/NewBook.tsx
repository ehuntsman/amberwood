import React, { useEffect, useState } from 'react';
import { assignBooks, addBook, bookSelector, Book } from './bookSlice';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { Link, useNavigate } from "react-router-dom";
import './book.css'
import axios from 'axios';

export function NewBook() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { books, isLoading, error } = useAppSelector(bookSelector);
  const [newBook, setNewBook] = useState({});
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [genre, setGenre] = useState('');
  const [price, setPrice] = useState('');


  const handleNewBook = (e: any) => {
    e.preventDefault();
    const id = books.length + 1;
    const newBook = {
      id: id,
      name: title,
      author: author,
      genre: genre,
      price: price,
      image: image,
      description: description,
    }
    console.log(newBook);
    setNewBook(newBook);
    dispatch(addBook(newBook));
    console.log(newBook, "this is")
    sendToApi();
  }

  async function sendToApi() {
    try {
      const { data } = await axios.post<Book>(
        '/books',
        newBook,
        {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
          },
        },
        );  
      console.log(newBook);
      navigate('/');
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
      <button>New Book</button>
      <div className="book-form">
        <label>Title</label>
        <input type="text" name="name" value={title} onChange={(e) => setTitle(e.target.value)}/>
        <label>Author</label>
        <input type="text" name="author" value={author} onChange={(e) => setAuthor(e.target.value)} />
        <label>Image URL</label>
        <input type="text" name="image" value={image} onChange={(e) => setImage(e.target.value)} />
        <label>Genre</label>
        <input type="text" name="genre" value={genre} onChange={(e) => setGenre(e.target.value)} />
        <label>Price</label>
        <input type="number" name="price" value={price} onChange={(e) => setPrice(e.target.value)} />
        <label>Description</label>
        <input type="text" name="description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <button onClick={handleNewBook}>Submit</button>
      </div>
    </div>
  );
}
