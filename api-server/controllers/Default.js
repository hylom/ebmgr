const BookManager = require('../../bookmanager/bookmanager.js');
const config = require('../../config.json');

const ebmgr = new BookManager(config);

module.exports.getBooks = function getBooks (req, res, next) {
  ebmgr.getBooks()
    .then(result => {
      res.status(200);
      res.json(result);
      res.end();
    })
    .catch(error => {
      console.log(error);
      if (error.status) {
        res.status(error.status);
      } else {
        res.status(500);
      }
      res.json(error);
      res.end();
    });
};

module.exports.getBookThumbnail = function getBookThumbnail (req, res, next, vpath) {
  ebmgr.getBookThumbnail(vpath)
    .then(thumb => {
      if (!thumb) {
        // resource not found
        res.writeHead(404);
        res.end();
        return;
      }
      res.writeHead(200, {'Content-Type': thumb.contentType });
      res.end(thumb.data);
    })
    .catch(error => {
      if (error.status) {
        res.status(error.status);
      } else {
        res.status(500);
      }
      res.json(error);
      res.end();
      return;
    });
};
