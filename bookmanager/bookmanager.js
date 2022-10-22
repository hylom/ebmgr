const { BookManagerBase } = require('./base');
const { booksMixinBuilder } = require('./books');
const { thumbnailMixinBuilder } = require('./thumbnail');
const { openBookMixinBuilder } = require('./open-book');
const { directoriesMixinBuilder } = require('./directories');
const { entriesMixinBuilder } = require('./entries');

const builders = [
  booksMixinBuilder,
  thumbnailMixinBuilder,
  openBookMixinBuilder,
  directoriesMixinBuilder,
  entriesMixinBuilder,
];

class InvalidPathError extends Error {
  constructor(message) {
    message = message || "invalid vpath";
    super(message);
  }
}

function applyMixins(mixinBuilders, base) {
  let result = base;
  for (const builder of mixinBuilders) {
    result = builder(result);
  }
  return result;
}

class BookManager extends applyMixins(builders, BookManagerBase) {}

module.exports = BookManager;
