const fs = require('fs');
const path = require('path');
const pageExtractor = require('./page-extractor');

module.exports.booksMixinBuilder = Base => class extends Base {
  async getBooks() {
    var results = [];
    const entries = await this._getAllEntries();
    for (const aliase in this.config.contentDirectory) {
      const r = this._searchContents(entries, aliase);
      results = results.concat(r);
    }
    return results;
  }

  async getPage(vpath, page) {
    const realPath = this._vpathToRealPath(vpath);
    if (!realPath) {
      return Promise.reject({ status: 404,
                              message: `invalid vpath: ${vpath}`
                            });
    }
    const entry = await this.getEntry(vpath);
    if (!vpath) {
      return Promise.reject({ status: 404,
                              message: `invalid vpath: ${vpath}`
                            });
    }
    if (page >= entry.pages) {
      return Promise.reject({ status: 404,
                              message: `invalid page: ${page}`
                            });
    }

    return pageExtractor.getPage(realPath, page);
  }

  async getBook(vpath) {
    const realPath = this._vpathToRealPath(vpath);
    if (!realPath) {
      return Promise.reject({ status: 404,
                              message: `invalid vpath: ${vpath}`
                            });
    }
    await this.db.open();
    const entry = await this.db.getEntry(vpath);
    await this.db.close();
    return entry;
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

  // vpath must use '/' as separator if on Window environment
  //const vpath = path.join(aliase, item.name);
  _joinPath(p1, p2) {
    return p1 + '/' + p2;
  }
  
  _searchContentsRecur(entries, dirName, aliase, results) {
    const dir = fs.readdirSync(dirName, {withFileTypes: true});
    const exts = this.config.targetExtentions;
    for (const item of dir) {
      if (item.isDirectory()) {
        this._searchContentsRecur(entries,
                                  this._joinPath(dirName, item.name),
                                  this._joinPath(aliase, item.name),
                                  results);
        continue;
      }
      for (const ext of exts) {
        if (item.name.endsWith(ext)) {
          const vpath = this._joinPath(aliase, item.name);
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

