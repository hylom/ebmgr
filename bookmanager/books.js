const fs = require('fs');
const path = require('path');

const BooksMixin = Base => class extends Base {
  async getBooks() {
    var results = [];
    const entries = await this._getAllEntries();
    for (const aliase in this.config.contentDirectory) {
      const r = this._searchContents(entries, aliase);
      results = results.concat(r);
    }
    return results;
  }

  async _getAllEntries() {
    await this.db.open();
    const entries = this.db.getAllEntries();
    await this.db.close();
    return entries;
  }

  _searchContents(entries, aliase) {
    const dirName = this.config.contentDirectory[aliase];
    const r = [];
    this._searchContentsRecur(entries, dirName, aliase, r);
    return r;
  }

  _searchContentsRecur(entries, dirName, aliase, results) {
    const dir = fs.readdirSync(dirName, {withFileTypes: true});
    const exts = this.config.targetExtentions;
    for (const item of dir) {
      if (item.isDirectory()) {
        this._searchContentsRecur(entries,
                             path.join(dirName, item.name),
                             path.join(aliase, item.name),
                             results);
        continue;
      }
      for (const ext of exts) {
        if (item.name.endsWith(ext)) {
          const vpath = path.join(aliase, item.name);
          const entry = entries[vpath] || {};
          entry.title = path.basename(item.name, ext);
          entry.vpath = vpath;
          
          results.push(entry);
          continue;
        }
      }
    }
  }
};

module.exports = BooksMixin;
