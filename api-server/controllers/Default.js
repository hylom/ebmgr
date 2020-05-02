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
