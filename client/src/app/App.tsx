import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import { Home } from '../components/home/Home';
import { Navi } from '../components/navi/Navi';
import { OneBook } from '../features/books/OneBook';
import { NewBook } from '../features/books/NewBook';
import { bookSelector, getBooks } from '../features/books/bookSlice';
import { useAppDispatch } from '../app/hooks';
import './app.css';

import {
	Routes,
	Route,
} from 'react-router-dom';
import { Genre } from '../components/genres/genre';
import Footer from '../components/footer/Footer';

const App = () => {
  const dispatch = useAppDispatch();
  const { books } = useSelector(bookSelector);

  useEffect(() => {
    dispatch(getBooks());
  }, []);

  return (
    <div className="app">
      <div className='main-container'>
        <Navi />
        {/* <div>
          <ul>
            <li>api is updating but state is not refreshing</li>
            <li>links change color if active</li>
            <li>change readme</li>
          </ul>
        </div> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books/new" element={<NewBook />} />
          <Route path="/books/:name" element={<OneBook />} />
          <Route path="/genres/:name" element={<Genre key={Date.now()}/>} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
