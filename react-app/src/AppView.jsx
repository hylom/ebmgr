import React, { useState } from 'react';
import ThumbnailGrid from './ThumbnailGrid';
import Sidebar from './Sidebar';
import { ImageViewer } from './ImageViewer';

export const AppView = props => {
  const [sidebarVisibility, setSidebarVisibility] = useState(false);
  const [mode, setMode] = useState('thumbnail');
  const [selectedBook, selectBook] = useState('');

  function toggleSidebar(visibility) {
    setSidebarVisibility(visibility);
  }

  function closeViewer() {
    setMode('thumbnail');
  }

  function open(vpath) {
    console.log(`open ${vpath}`);
    selectBook(vpath);
    setMode('viewer');
  }

  let content;
  if (mode === 'thumbnail') {
    content = (
      <div>
        <Sidebar visible={sidebarVisibility} />
        <ThumbnailGrid toggleSidebar={toggleSidebar}
                       openBook={open}
        />
      </div>
    );
  } else if (mode === 'viewer') {
    content = <ImageViewer vpath={selectedBook} closeViewer={closeViewer} />;
  }

  return (
    <div id="root-wrap">
      {content}
    </div>
  );
}
