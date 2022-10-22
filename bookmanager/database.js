const util = require('./util');

const Store = require('./json-store');
const bookInspector = require('./book-inspector');

class Database {
  constructor(config) {
    this.config = config;
    this.store = new Store(config);
  }

  async getAllEntries() {
    return this.store.getAllEntries();
  }

  async getEntry(vpath) {
    let entry = await this.store.getEntry(vpath);

    if (!entry) {
      // create new entry
      const realPath = util.vpathToRealPath(this.config, vpath);
      entry = await bookInspector.inspect(realPath);
    }
    //console.log(entry);
    return entry;
  }

  async setEntry(vpath, data) {
    return this.store.setEntry(vpath, data);
  }

  async open() {
    return this.store.open();
  }

  async commit() {
    return this.store.commit();
  }

  async rollback() {
    return this.store.rollback();
  }

  async close() {
    return this.store.close();
  }
}

module.exports = Database;
