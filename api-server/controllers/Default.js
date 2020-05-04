'use strict';

var utils = require('../utils/writer.js');
var Default = require('../service/DefaultService');

module.exports.getBooks = function getBooks (req, res, next) {
  Default.getBooks()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getBookThumbnail = function getBookThumbnail (req, res, next, vpath) {
  Default.getBookThumbnail(vpath)
    .then(function (thumb) {
      if (!thumb) {
        // resource not found
        res.writeHead(404);
        res.end();
        return;
      }
      res.writeHead(200, {'Content-Type': thumb.contentType });
      res.end(thumb.data);
    })
    .catch(function (response) {
      res.writeHead(500);
      res.end();
    });
};
