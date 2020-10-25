import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ThumbnailGrid from './ThumbnailGrid';
import Sidebar from './Sidebar';

ReactDOM.render(
    <React.StrictMode>
    <div id="root-wrap">
    <Sidebar />
    <ThumbnailGrid />
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);

