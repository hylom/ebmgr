const path = require('path');
const fs = require('fs');
const os = require('os');
const crypto = require('crypto');
const child_process = require('child_process');

const config = require('./config.json');
const gs = require('ghostscript4js');
const AdmZip = require('adm-zip');
const sharp = require('sharp');

async function getThumbnailPath(realPath) {
  const cacheDir = config.cacheDirectory;
  if (!cacheDir) {
    throw { message: 'no cacheDir given',
            name: 'CacheDirNotFoundError' };
  }

  // check cacheDir exists
  let stat;
  try {
    stat = await fs.promises.stat(cacheDir);
  } catch (err) {
    fs.promises.mkdir(cacheDir);
  }

  if (!stat.isDirectory()) {
    throw { message: 'invalid cacheDir given',
            name: 'InvalidCacheDirError' };
  }
  
  stat = await fs.promises.stat(realPath);
  let ext = '.jpeg';
  return path.join(cacheDir, `${stat.dev}_${stat.ino}${ext}`);
}

function saveThumbnailCache(realPath, thumb) {
  return getThumbnailPath(realPath).then(thumbPath => {
    // resive image
    sharp(thumb.data)
      .resize({width: 300,
               height: 300,
               fit: sharp.fit.inside})
      .toFile(thumbPath)
      .then(() => thumb);
  });
}

function getHash(target, algo) {
  algo = algo || 'md5';
  const hash = crypto.createHash(algo);
  hash.update(target);
  return hash.digest('hex');
}

function makeTempFile(vpath, ext) {
  const tmpdir = os.tmpdir();
  let pathname = path.join(tmpdir, getHash(vpath, 'sha256') + ext);

  let done = false;
  let n = 0;
  while (!done) {
    try {
      fs.writeFileSync(pathname, "", {flag: 'wx'});
      done = true;
    }
    catch (e) {
      pathname = path.join(tmpdir, getHash(vpath + String(n), 'sha256') + ext);
      n++;
    }
  }
  return pathname;
}

exports.getBookThumbnail = getBookThumbnail;
async function getBookThumbnail(vpath, page) {
  // check given path
  const realPath = vpathToRealPath(vpath);
  if (!realPath) {
    return Promise.reject();
  }

  // check thumbnail if exists
  try {
    const thumbPath = await getThumbnailPath(realPath);
    const data = await fs.promises.readFile(thumbPath);
    return { contentType: 'image/jpeg',
             data: data };
  } catch (e) {
    // thumbnail not found, then generate
    const ext = path.extname(realPath).toLowerCase();
    if (ext == ".pdf") {
      page = page || 1;
      const thumb = await getPdfThumbnail(vpath, page);
      await saveThumbnailCache(realPath, thumb);
      return thumb;
    }
    if (ext == ".zip" || ext == ".cbz") {
      const thumb = await getZipThumbnail(vpath);
      await saveThumbnailCache(realPath, thumb);
      return thumb;
    }
    return Promise.reject();
  }
}

function getZipThumbnail(vpath) {
  const realPath = vpathToRealPath(vpath);
  const zip = new AdmZip(realPath);
  const rex = /(\.jpeg|\.jpg)$/;

  for (const entry of zip.getEntries()) {
    if (!entry.isDirectory && rex.test(entry.entryName)) {
      const data = zip.readFile(entry);
      return Promise.resolve({ contentType: 'image/jpeg',
                               data: data });
    }
  }
  return Promise.reject();
}

async function getPdfThumbnail(vpath, page) {
  const pathname = await makeTempFile(vpath, ".jpeg");
  await generatePdfThumbnail(vpath, pathname, page);

  const data = await fs.promises.readFile(pathname);
  await fs.promises.unlink(pathname);

  return { contentType: 'image/jpeg',
           data: data };
}
  
function generatePdfThumbnail(vpath, destination, page) {
  page = page || 1;
  const realPath = vpathToRealPath(vpath);

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
};

function vpathToRealPath(vpath) {
  const m = /^([^/]*)(\/.*)$/.exec(vpath);
  if (m) {
    const hash = m[1];
    const targetDirs = config.contentDirectories;
    for (const dir of targetDirs) {
      if (getHash(dir) == hash) {
        return path.join(dir, m[2]);
      }
    }
  }
  return undefined;
};

function main() {
  const targetDirs = config.contentDirectories;
  for (const dir of targetDirs) {
    const r = getBooks(dir);
    for (const item of r) {
      console.log(item);
    }
  }
}

exports.getBooks = getBooks;
function getBooks() {
  return new Promise((resolve, reject) => {
    const targetDirs = config.contentDirectories;
    var results = [];
    for (const dir of targetDirs) {
      const r = searchContents(dir);
      results = results.concat(r);
    }
    resolve(results);
  });
};

function searchContents(dirname) {
  const dirnameHash = getHash(dirname);
  const r = [];
  _searchContents(dirname, dirnameHash, r);
  return r;

  function _searchContents(dirname, dirnameHash, results) {
    const dir = fs.readdirSync(dirname, {withFileTypes: true});
    const exts = config.targetExtentions;
    for (const item of dir) {
      if (item.isDirectory()) {
        _searchContents(path.join(dirname, item.name),
                        path.join(dirnameHash, item.name),
                        results);
        continue;
      }
      for (const ext of exts) {
        if (item.name.endsWith(ext)) {
          const metadata = {};
          metadata.title = path.basename(item.name, ext);
          metadata.path = path.join(dirnameHash, item.name);
          results.push(metadata);
          continue;
        }
      }
    }
  }
}

exports.openBook = openBook;
function openBook(vpath) {
  // check given path
  const realPath = vpathToRealPath(vpath);
  if (!realPath) {
    return Promise.reject();
  }

  const openCmd = '/usr/bin/open';
  const args = [ realPath ];
  const opts = {};
  const viewer = getViewer(vpath);

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
};

function getViewer(vpath) {
  const ext = path.extname(vpath).toLowerCase();
  const viewers = config.viewers;
  return viewers[ext];
}
