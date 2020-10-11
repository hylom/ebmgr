const BookManager = require('../../bookmanager/bookmanager.js');
const config = require('../../config.json');

const ebmgr = new BookManager(config);

function _getPathParam(req, key) {
  return req.openapi.pathParams[key];
}

module.exports.getBooks = function getBooks (req, res, next) {
  ebmgr.getBooks()
    .then(result => {
      res.status(200);
      res.json(result);
      res.end();
    })
    .catch(error => {
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

module.exports.setStar = function setStar (req, res, next) {
  const starState = req.body.star;
  const vpath = _getPathParam(req, 'vpath');
  if (starState === undefined) {
    res.status(400);
    res.json({message: "parameter 'star' not given"});
    res.end();
    return;
  }
  ebmgr.setStar(vpath, starState ? true : false)
    .then(result => {
      res.status(200);
      res.end();
    })
    .catch(error => {
      if (error.status) {
        res.status(error.status);
      } else {
        res.status(500);
      }
      res.json(error);
      res.end();
    });
};
