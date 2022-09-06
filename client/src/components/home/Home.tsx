import React, { useEffect, useState } from 'react';
import { Books } from '../../features/books/Books';
import { Link  } from "react-router-dom";
import './home.css';


export function Home() {

  return (
    <div className="container">
      <ul className="genre-links">
        <li>
          <h4>See books by genre:</h4>
        </li>
        <li>
          <Link to="/genres/fantasy">Fantasy</Link>
        </li>
        <li>
          <Link to="/genres/scifi">Science Fiction</Link>
        </li>
        <li>
          <Link to="/genres/romance">Romance</Link>
        </li>
      </ul>
      <Books />
    </div>
  );
}
