import React, { useState } from 'react';
import './sushi.css';

export function ImageViewer(props) {
  const [currentPage, setCurrentPage] = useState(0);
  const [isSingleLayout, setSingleLayout] = useState(true);

  const vpath = props.vpath;

  if (currentPage != 0) {
    setSingleLayout(false);
  }

  let pages = '';
  if (isSingleLayout) {
    pages = (
      <div className="page">
        <img className="vh100" src={getPageUrl(vpath, currentPage)} />
      </div>
    );
  } else {
  }

  function back() {
    console.log('back');
    props.closeViewer();
  }

  return (
    <div className="imageViewer">
      <div className="header">
        <a href="#" onClick={back}>back</a>
      </div>
      <div className="body">
        {pages}
      </div>
    </div>
  );
}

function getPageUrl(vpath, page) {
  const baseUrl = '/api/v1/books';
  return `${baseUrl}/${encodeURIComponent(vpath)}/pages/${page}`;
}
