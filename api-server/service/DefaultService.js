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

