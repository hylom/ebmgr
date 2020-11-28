const path = require('path');
const os = require('os');
const child_process = require('child_process');
const fs = require('fs');

const BookManagerBase = require('./base');
const BooksMixin = require('./books');
const ThumbnailMixin = require('./thumbnail');

class InvalidPathError extends Error {
  constructor(message) {
    message = message || "invalid vpath";
    super(message);
  }
}

class BookManager extends BooksMixin(ThumbnailMixin(BookManagerBase)) {
  openBook(vpath) {
    // check given path
    const realPath = this._vpathToRealPath(vpath);
    if (!realPath) {
      return Promise.reject({
        status: 404,
        message: `cannot open book: ${realPath}`
      });
    }

    const openCmd = '/usr/bin/open';
    const args = [ realPath ];
    const opts = {};
    const viewer = this._getViewer(vpath);

    if (viewer && viewer.length) {
      args.push('-a');
      args.push(viewer);
    }

    return new Promise((resolve, reject) => {
      child_process.execFile(openCmd, args, opts,
                             (error, stdout, stderr) => {
                               if (error) {
                                 reject(error);
                                 return;
                               }
                               resolve();
                             });
    });
  }

  _getViewer(vpath) {
    const ext = path.extname(vpath).toLowerCase();
    const viewers = this.config.viewers;
    return viewers[ext];
  }

  getRootDirectories() {
    return this.config.contentDirectories.map(d => this._getHash(d));
  }

  async getEntry(vpath) {
    await this.db.open();
    const entry = this.db.getEntry(vpath);
    await this.db.close();
    return entry;
  }

  async setEntry(vpath, entry) {
    await this.db.open();
    await this.db.setEntry(vpath, entry);
    await this.db.commit();
    await this.db.close();
  }

  async setStar(vpath, state) {
    if (!vpath) {
      throw new InvalidPathError();
    }
    const entry = await this.getEntry(vpath);
    if (state) {
      entry.starred = true;
    } else {
      delete entry.starred;
    }
    await this.setEntry(vpath, entry);
  }

  async getDirectories() {
    const result = {};
    for (const d of this.config.contentDirectories) {
      const vpath = this._getHash(d);
      const dirs = await this._getSubDirectories(d);
      result[vpath] = dirs;
    }
    return result;
  }

  async _getSubDirectories(dir) {
    const items = await fs.promises.opendir(dir);
    const result = {};
    for await (const dirent of items) {
      if (dirent.isDirectory()) {
        const name = dirent.name;
        result[name] = await this._getSubDirectories(path.join(dir, name));
      }
    }
    return result;
  }
  
}

module.exports = BookManager;
