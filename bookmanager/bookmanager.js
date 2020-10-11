const path = require('path');
const fs = require('fs');
const os = require('os');
const crypto = require('crypto');
const child_process = require('child_process');

const gs = require('ghostscript4js');
const AdmZip = require('adm-zip');
const sharp = require('sharp');

const Database = require('./json-store');

class InvalidPathError extends Error {
  constructor(message) {
    message = message || "invalid vpath";
    super(message);
  }
}

class BookManager {
  constructor(config) {
    this.config = config;
    this.db = new Database(config);
  }

  async getThumbnailPath(realPath) {
    const cacheDir = this.config.cacheDirectory;
    if (!cacheDir) {
      throw { status: 500,
              message: 'no cacheDir given',
              name: 'CacheDirNotFoundError',
            };
    }

    // check cacheDir exists
    let stat;
    try {
      stat = await fs.promises.stat(cacheDir);
    } catch (err) {
      fs.promises.mkdir(cacheDir);
    }

    if (!stat.isDirectory()) {
      throw { status: 500,
              message: 'invalid cacheDir given',
              name: 'InvalidCacheDirError',
            };
    }
    
    stat = await fs.promises.stat(realPath);
    let ext = '.jpeg';
    return path.join(cacheDir, `${stat.dev}_${stat.ino}${ext}`);
  }

  saveThumbnailCache(realPath, thumb) {
    return this.getThumbnailPath(realPath).then(thumbPath => {
      // resive image
      sharp(thumb.data)
        .resize({width: 300,
                 height: 300,
                 fit: sharp.fit.inside})
        .toFile(thumbPath)
        .then(() => thumb);
    });
  }

  getHash(target, algo) {
    algo = algo || 'md5';
    const hash = crypto.createHash(algo);
    hash.update(target);
    return hash.digest('hex');
  }

  makeTempFile(vpath, ext) {
    const tmpdir = os.tmpdir();
    let pathname = path.join(tmpdir, this.getHash(vpath, 'sha256') + ext);

    let done = false;
    let n = 0;
    while (!done) {
      try {
        fs.writeFileSync(pathname, "", {flag: 'wx'});
        done = true;
      }
      catch (e) {
        pathname = path.join(tmpdir, this.getHash(vpath + String(n), 'sha256') + ext);
        n++;
      }
    }
    return pathname;
  }

  async getBookThumbnail(vpath, page) {
    // check given path
    const realPath = this.vpathToRealPath(vpath);
    if (!realPath) {
      return Promise.reject({ status: 400,
                              message: `invalid vpath: ${vpath}`
                            });
    }

    // check thumbnail if exists
    try {
      const thumbPath = await this.getThumbnailPath(realPath);
      const data = await fs.promises.readFile(thumbPath);
      return { contentType: 'image/jpeg',
               data: data };
    } catch (e) {
      // thumbnail not found, then generate
      const ext = path.extname(realPath).toLowerCase();
      if (ext == ".pdf") {
        page = page || 1;
        const thumb = await this.getPdfThumbnail(vpath, page);
        await this.saveThumbnailCache(realPath, thumb);
        return thumb;
      }
      if (ext == ".zip" || ext == ".cbz") {
        const thumb = await this.getZipThumbnail(vpath);
        await this.saveThumbnailCache(realPath, thumb);
        return thumb;
      }
      return Promise.reject({
        status: 400,
        message: `invalid file extension: ${ext} (target: ${path} )`
      });
    }
  }

  getZipThumbnail(vpath) {
    const realPath = this.vpathToRealPath(vpath);
    const zip = new AdmZip(realPath);
    const rex_jpg = /(\.jpeg|\.jpg)$/i;
    const rex_png = /(\.png)$/i;

    for (const entry of zip.getEntries()) {
      if (!entry.isDirectory && rex_jpg.test(entry.entryName)) {
        const data = zip.readFile(entry);
        return Promise.resolve({ contentType: 'image/jpeg',
                                 data: data });
      }
      if (!entry.isDirectory && rex_png.test(entry.entryName)) {
        const data = zip.readFile(entry);
        return Promise.resolve({ contentType: 'image/png',
                                 data: data });
      }
    }
    return Promise.reject({
      status: 400,
      message: `cannot get zip thumbnail for ${realPath}`
    });
  }

  async getPdfThumbnail(vpath, page) {
    const pathname = await this.makeTempFile(vpath, ".jpeg");
    await this.generatePdfThumbnail(vpath, pathname, page);

    const data = await fs.promises.readFile(pathname);
    await fs.promises.unlink(pathname);

    return { contentType: 'image/jpeg',
             data: data };
  }
  
  generatePdfThumbnail(vpath, destination, page) {
    page = page || 1;
    const realPath = this.vpathToRealPath(vpath);

    if (!destination) {
      const target = path.parse(realPath);
      destination = path.join(target.dir, target.name + '.jpeg');
    }

    const gsCmd = [ "-sDEVICE=jpeg",
                    "-o",
                    destination,
                    "-sDEVICE=jpeg",
                    "-r72",
                    `-dFirstPage=${page}`,
                    `-dLastPage=${page}`,
                    "-q",
                    realPath];

    return new Promise((resolve, reject) => {
      gs.execute(gsCmd, err => {
        if (err) {
          reject(err);
          return;
        }
        resolve(destination);
      });
    });
  }

  vpathToRealPath(vpath) {
    const m = /^([^/]*)(\/.*)$/.exec(vpath);
    if (m) {
      const hash = m[1];
      const targetDirs = this.config.contentDirectories;
      for (const dir of targetDirs) {
        if (this.getHash(dir) == hash) {
          return path.join(dir, m[2]);
        }
      }
    }
    return undefined;
  }

  async getBooks() {
    const targetDirs = this.config.contentDirectories;
    var results = [];
    const entries = await this._getAllEntries();
    for (const dir of targetDirs) {
      const r = this.searchContents(entries, dir);
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

  searchContents(entries, dirname) {
    const dirnameHash = this.getHash(dirname);
    const r = [];
    this._searchContents(entries, dirname, dirnameHash, r);
    return r;
  }

  _searchContents(entries, dirname, dirnameHash, results) {
    const dir = fs.readdirSync(dirname, {withFileTypes: true});
    const exts = this.config.targetExtentions;
    for (const item of dir) {
      if (item.isDirectory()) {
        this._searchContents(entries,
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

  openBook(vpath) {
    // check given path
    const realPath = this.vpathToRealPath(vpath);
    if (!realPath) {
      return Promise.reject({
        status: 404,
        message: `cannot open book: ${realPath}`
      });
    }

    const openCmd = '/usr/bin/open';
    const args = [ realPath ];
    const opts = {};
    const viewer = this.getViewer(vpath);

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

  getViewer(vpath) {
    const ext = path.extname(vpath).toLowerCase();
    const viewers = this.config.viewers;
    return viewers[ext];
  }

  async setStar(vpath, state) {
    if (!vpath) {
      throw new InvalidPathError();
    }
    await this.db.open();
    const entry = await this.db.getEntry(vpath);
    if (state) {
      entry.starred = true;
    } else {
      delete entry.starred;
    }
    await this.db.setEntry(vpath, entry);
    await this.db.commit();
    await this.db.close();
  }

}

module.exports = BookManager;
