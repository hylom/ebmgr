const path = require('path');
const fsPromises = require('fs').promises;

const METADATA_INIT = {
  version: 1,
  entries: {},
};

class AccessBeforeOpenError extends Error {
  constructor(message) {
    message = message || "Access before open";
    super(message);
  }
}

class JsonStore {
  constructor(config) {
    this._metadataName = 'metadata.json';
    this.config = config;
    this.metadata = null;
    this.modified = false;
    this._loaded = false;
  }

  _newMetadata() {
    return Object.assign({}, METADATA_INIT);
  }

  _jsonPath() {
    //return this.config.jsonMetadataPath;
    return path.join(this.config.cacheDirectory, this._metadataName);
  }

  async getAllEntries() {
    if (!this._loaded) {
      return Promise.reject(new AccessBeforeOpenError());
    }
    return Object.assign({}, this.metadata.entries);
  }

  async getEntry(vpath) {
    if (!this._loaded) {
      return Promise.reject(new AccessBeforeOpenError());
    }
    return Promise.resolve(this.metadata.entries[vpath] || null);
  }

  async setEntry(vpath, data) {
    if (!this._loaded) {
      return Promise.reject(new AccessBeforeOpenError());
    }
    if (!Object.keys(data).length) {
      delete this.metadata.entries[vpath];
    } else {
      this.metadata.entries[vpath] = Object.assign({}, data);
    }
    this.modified = true;
    return Promise.resolve();
  }

  async open() {
    if (this._loaded) {
      return Promise.resolve();
    }
    return fsPromises
      .readFile(this._jsonPath(), {encoding: "utf8"})
      .then(json => {
        this.metadata = JSON.parse(json);
        this.modified = false;
        this._loaded = true;
      })
      .catch(error => {
        if (error.code === "ENOENT") {
          this.metadata = this._newMetadata();
          this.modified = false;
          this._loaded = true;
          return;
        }
        throw error;
      });
  }

  async commit() {
    if (!this.modified) {
      return Promise.resolve();
    }
    return fsPromises.
      writeFile(this._jsonPath(),
                JSON.stringify(this.metadata),
                {encoding: "utf8"})
      .then(() => { this.modified = false; })
      .catch(err => {
        //console.log(err);
        //console.log(this._jsonPath());
        throw err;
      });
  }

  async rollback() {
    if (!this.modified) {
      return Promise.resolve();
    }
    return this.open();
  }

  async close() {
    if (this.modified) {
      return Promise.reject(new Error("metadata modified but not commited"));
    }
    return Promise.resolve();
  }
}

module.exports = JsonStore;
