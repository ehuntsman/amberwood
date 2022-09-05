import './navi.css';
import { Link } from 'react-router-dom';

export function Navi() {
  // this is because we are using the same component for each genre. history has been replaces with navigation in react-router-dom and it doesn't function the same way. So this is an alternative
  const refreshPage = () => {
    setTimeout(()=>{
        window.location.reload();
    }, 500);
    console.log('page to reload')
  }

  return (
    <div className="navi">
      <ul>
        <li>
          <Link to="/">All Books</Link>
        </li>
      </ul>
      <ul className="navi-links">
          <li>
            <Link to="/genres/fantasy" onClick={refreshPage}>Fantasy</Link>
          </li>
          <li>
            <Link to="/genres/scifi" onClick={refreshPage}>Science Fiction</Link>
          </li>
          <li>
            <Link to="/genres/romance" onClick={refreshPage}>Romance</Link>
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
