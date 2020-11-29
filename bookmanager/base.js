const crypto = require('crypto');
const path = require('path');
const os = require('os');
const fs = require('fs');

const Database = require('./json-store');

class BookManagerBase {
  constructor(config) {
    this.config = config;
    this.db = new Database(config);
  }

  _getHash(target, algo) {
    algo = algo || 'md5';
    const hash = crypto.createHash(algo);
    hash.update(target);
    return hash.digest('hex');
  }

  _makeTempFile(vpath, ext) {
    const tmpdir = os.tmpdir();
    let pathname = path.join(tmpdir, this._getHash(vpath, 'sha256') + ext);

    let done = false;
    let n = 0;
    while (!done) {
      try {
        fs.writeFileSync(pathname, "", {flag: 'wx'});
        done = true;
      }
      catch (e) {
        pathname = path.join(tmpdir, this._getHash(vpath + String(n), 'sha256') + ext);
        n++;
      }
    }
    return pathname;
  }

  _vpathToRealPath(vpath) {
    const m = /^([^/]*)(\/.*)$/.exec(vpath);
    if (m) {
      const alias = m[1];
      for (const dir in this.config.contentDirectory) {
        if (dir == alias) {
          return path.join(this.config.contentDirectory[dir], m[2]);
        }
      }
    }
    return undefined;
  }
}

module.exports = BookManagerBase;
