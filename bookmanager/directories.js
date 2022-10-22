const fs = require('fs');
const path = require('path');

module.exports.directoriesMixinBuilder = Base => class extends Base {
  getRootDirectories() {
    //return this.config.contentDirectories.map(d => this._getHash(d));
    return Object.keys(this.config.contentDirectory);
  }

  async getDirectories() {
    const result = {};
    for (const vpath in this.config.contentDirectory) {
      const d = this.config.contentDirectory[vpath];
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
  
};
