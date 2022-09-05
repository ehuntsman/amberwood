import React, { useEffect, useState } from 'react';
import { updateBook, setLoading, bookSelector, getBooks, Book } from './bookSlice';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { Link, Navigate, useNavigate  } from "react-router-dom";
import axios from 'axios';
import './book.css'

export function OneBook() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { books, isLoading, error } = useAppSelector(bookSelector);
  const [book, setBook] = useState<Book>({} as Book);
  const [updatedBook, setUpdatedBook] = useState<Book>({} as Book);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [genre, setGenre] = useState('');
  const [price, setPrice] = useState('');
  const [modalState, setModalState] = useState(false);

  useEffect(() => {
    // not the best way to do this but filter wasn't working and the match docs are confusing
    const bookId = window.location.pathname.split('/')[2];
    // Probably should have this as an API call and then set it that way
    for(let i = 0; i < books.length; i++) {
      let bookNumber = books[i].id.toString();
      console.log(books[i].id, "and ", bookId );
      if (bookNumber === bookId) {
        const thebook = books[i];
        setTitle(thebook.name);
        setAuthor(thebook.author);
        setImage(thebook.image);
        setDescription(thebook.description);
        setGenre(thebook.genre);
        setPrice(thebook.price);
        setUpdatedBook(thebook);
      }
    }
  }, []);

  const toggle = () => {
    setModalState(!modalState);
  }

  type DeleteBookResponse = ''
  const toDelete = async () => {
    console.log(updatedBook, "to be deleted");
    try {
      const { data } = await axios.delete<DeleteBookResponse>(
        `/books/${updatedBook.id}`,
        {
          headers: {
            Accept: 'application/json',
          },
        },
      );
      console.log('response is: ', data);
      dispatch(getBooks());
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

  const sendToApi = async () => {
    const changedBook = {
      id: updatedBook.id,
      name: title,
      author: author,
      genre: genre,
      price: price,
      image: image,
      description: description,
    }
    dispatch(setLoading(true));
    setUpdatedBook(updatedBook);
    try {
      const { data } = await axios.patch<Book>(
        `/books/${book.id}`,
        changedBook,
        {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
          },
        },
      );
      dispatch(updateBook(data));
      dispatch(setLoading(false));
      dispatch(getBooks());
      navigate('/')
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
      <div className="book-container">
        <div className="book-image">
          <img src={image} alt={title} />
        </div>
        <div className="book-info">
          <div className="title-box">
            <h1>{title}</h1>
            <button onClick={toggle}>Edit Book</button>
          </div>
          <h4>By: {author}</h4>
          <p>{description}</p>
        </div>
      </div>

      {modalState && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={toggle}>&times;</span>
            <button onClick={toDelete} className="delete">Delete this book</button>
            <p>------ OR ------</p>
            <div className="edit-form">
              <h4>Edit this book</h4>
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
              <textarea name="description" value={description} onChange={(e) => setDescription(e.target.value)} />
              <button onClick={sendToApi}>Update The Book</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
