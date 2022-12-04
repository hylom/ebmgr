import React, { useState } from 'react';
import { mihiraki } from 'mihiraki';
import './sushi.css';

export function ImageViewer(props) {
  const [currentPage, setCurrentPage] = useState(0);
  const [isSingleLayout, setSingleLayout] = useState(true);

  const vpath = props.vpath;

  function back() {
    console.log('back');
    props.closeViewer();
  }

  const baseUrl = '/api/v1/books';
  const tocUrl = `${baseUrl}/${encodeURIComponent(vpath)}/toc`;

  return (
    <div className="imageViewer w100">
      <div className="header">
        <a href="#" onClick={back}>back</a>
      </div>
      <div className="body">
        <mihiraki-viewer toc={tocUrl} />
      </div>
    </div>
  );
}

