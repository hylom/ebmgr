// mygenerator.js
var Parser = require("jison").Parser;
const grammar = require('./grammar');

var parser = new Parser(grammar);

// generate source, ready to be written to disk
var parserSource = parser.generate();
//console.log(parserSource);
// you can also use the parser directly from memory

const string = process.argv[2];
console.log(`string: ${string}`);
if (!string) {
  console.log("please give string");
  return;
}

const a = parser.parse(string);
console.log(a);
