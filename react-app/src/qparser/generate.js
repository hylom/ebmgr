// mygenerator.js
const Parser = require("jison").Parser;
const grammar = require('./grammar');

const parser = new Parser(grammar);

// generate source, ready to be written to disk
const parserSource = parser.generate();
console.log(parserSource);
