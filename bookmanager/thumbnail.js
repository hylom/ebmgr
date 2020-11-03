const fs = require('fs');
const path = require('path');

const gs = require('ghostscript4js');
const AdmZip = require('adm-zip');
const sharp = require('sharp');


const ThumbnailMixin = Base => class extends Base {
  async _getThumbnailPath(realPath) {
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

  _saveThumbnailCache(realPath, thumb) {
    return this._getThumbnailPath(realPath).then(thumbPath => {
      // resive image
      sharp(thumb.data)
        .resize({width: 300,
                 height: 300,
                 fit: sharp.fit.inside})
        .toFile(thumbPath)
        .then(() => thumb);
    });
  }
  async getBookThumbnail(vpath, page) {
    // check given path
    const realPath = this._vpathToRealPath(vpath);
    if (!realPath) {
      return Promise.reject({ status: 400,
                              message: `invalid vpath: ${vpath}`
                            });
    }

    // check thumbnail if exists
    try {
      const thumbPath = await this._getThumbnailPath(realPath);
      const data = await fs.promises.readFile(thumbPath);
      return { contentType: 'image/jpeg',
               data: data };
    } catch (e) {
      // thumbnail not found, then generate
      const ext = path.extname(realPath).toLowerCase();
      if (ext == ".pdf") {
        page = page || 1;
        const thumb = await this._getPdfThumbnail(vpath, page);
        await this._saveThumbnailCache(realPath, thumb);
        return thumb;
      }
      if (ext == ".zip" || ext == ".cbz") {
        const thumb = await this._getZipThumbnail(vpath);
        await this._saveThumbnailCache(realPath, thumb);
        return thumb;
      }
      return Promise.reject({
        status: 400,
        message: `invalid file extension: ${ext} (target: ${path} )`
      });
    }
  }

  _getZipThumbnail(vpath) {
    const realPath = this._vpathToRealPath(vpath);
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

  async _getPdfThumbnail(vpath, page) {
    const pathname = await this._makeTempFile(vpath, ".jpeg");
    await this._generatePdfThumbnail(vpath, pathname, page);

    const data = await fs.promises.readFile(pathname);
    await fs.promises.unlink(pathname);

    return { contentType: 'image/jpeg',
             data: data };
  }
  
  _generatePdfThumbnail(vpath, destination, page) {
    page = page || 1;
    const realPath = this._vpathToRealPath(vpath);

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
};

module.exports = ThumbnailMixin;
