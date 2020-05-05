const ebmgr = require('../../ebmgr.js');

/**
 * Returns all books list
 *
 * returns List
 **/
exports.getBooks = function() {
  return ebmgr.getBooks();
}

/**
 * Returns a thumbnail of the book
 *
 * vpath String virtual path of the book
 * returns byte[]
 **/
exports.getBookThumbnail = function(vpath) {
  return ebmgr.getBookThumbnail(vpath);
}
