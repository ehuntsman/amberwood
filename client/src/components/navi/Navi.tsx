import './navi.css';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

export function Navi() {
  return (
    <div className="navi">
      <ul>
        <li>
          <Link to="/" className="script">Amberwood Public Library</Link>
        </li>
      </ul>
      
      <ul className="new-book">
        <li>
          <Link to="/books/new">+ Add a new book</Link>
        </li>
      </ul>
    </div>
  );
}
