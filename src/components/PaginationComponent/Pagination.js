import React from 'react';
import "./Pagination.css";

const Pagination = ({ postsPerPage, totalPosts, paginate,  activeClass}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  
  return (
    <nav>
      <ul className='pagination'>
        {pageNumbers.map(number => (
          <li key={number} className='page-item'>
            <div onClick={() => paginate(number)}  className={`page-link ${number === activeClass ? 'active' : ''}`}>
              {number}
            </div>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;