const fs = require('fs');
const path = require('path');

const BooksMixin = Base => class extends Base {
  async getBooks() {
    const targetDirs = this.config.contentDirectories;
    var results = [];
    const entries = await this._getAllEntries();
    for (const dir of targetDirs) {
      const r = this._searchContents(entries, dir);
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

  _searchContents(entries, dirname) {
    const dirnameHash = this._getHash(dirname);
    const r = [];
    this._searchContentsRecur(entries, dirname, dirnameHash, r);
    return r;
  }

  _searchContentsRecur(entries, dirname, dirnameHash, results) {
    const dir = fs.readdirSync(dirname, {withFileTypes: true});
    const exts = this.config.targetExtentions;
    for (const item of dir) {
      if (item.isDirectory()) {
        this._searchContentsRecur(entries,
                             path.join(dirname, item.name),
                             path.join(dirnameHash, item.name),
                             results);
        continue;
      }
      for (const ext of exts) {
        if (item.name.endsWith(ext)) {
          const vpath = path.join(dirnameHash, item.name);
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
