import React, { useEffect, useState } from 'react';
import { Books } from '../../features/books/Books';
import './home.css';


export function Home() {

  return (
    <div className="container">
      <Books />
    </div>
  );
}
