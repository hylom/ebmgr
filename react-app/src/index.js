import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ThumbnailGrid from './ThumbnailGrid';

ReactDOM.render(
  <React.StrictMode>
    <ThumbnailGrid />
    <div className="main-bottom"></div>
  </React.StrictMode>,
  document.getElementById('root')
);

