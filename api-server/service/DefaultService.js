const ebmgr = require('../../ebmgr.js');

/**
 * Returns all books list
 *
 * returns List
 **/
exports.getBooks = function() {
  return new Promise(function(resolve, reject) {
    const items = ebmgr.getContents();
    resolve(items);
  });
}

/**
 * Returns a thumbnail of the book
 *
 * vpath String virtual path of the book
 * returns byte[]
 **/
exports.getBookThumbnail = function(vpath) {
  return new Promise(function(resolve, reject) {
    const thumb = ebmgr.getThumbnail(vpath);
    if (thumb) {
      resolve(thumb);
    } else {
      resolve();
    }
  });
}
