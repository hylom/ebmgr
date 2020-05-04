const path = require('path');
const fs = require('fs');
const os = require('os');
const crypto = require('crypto');

const config = require('./config.json');
const gs = require('ghostscript4js');
const AdmZip = require('adm-zip');

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

exports.getThumbnail = getThumbnail;
function getThumbnail(vpath, page) {
  // check given path
  const realPath = vpathToRealPath(vpath);
  if (!realPath) {
    return undefined;
  }

  const ext = path.extname(realPath).toLowerCase();
  if (ext == ".pdf") {
    page = page || 1;
    return getPdfThumbnail(vpath, page);
  }
  if (ext == ".zip" || ext == ".cbz") {
    return getZipThumbnail(vpath);
  }
};

function getZipThumbnail(vpath) {
  const realPath = vpathToRealPath(vpath);
  const zip = new AdmZip(realPath);
  const rex = /(\.jpeg|\.jpg)$/;

  for (const entry of zip.getEntries()) {
    if (!entry.isDirectory && rex.test(entry.entryName)) {
      console.log(entry.entryName);
      const data = zip.readFile(entry);
      return { contentType: 'image/jpeg',
               data: data };
    }
  }
}

function getPdfThumbnail(vpath, page) {
  const pathname = makeTempFile(vpath, ".jpeg");
  generatePdfThumbnail(vpath, pathname, page);

  const data = fs.readFileSync(pathname);
  fs.unlinkSync(pathname);

  return { contentType: 'image/jpeg',
           data: data };
}
  
exports.generatePdfThumbnail = generatePdfThumbnail;
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

  gs.executeSync(gsCmd);
  return destination;
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
    const r = getContents(dir);
    for (const item of r) {
      console.log(item);
    }
  }
}

exports.getContents = function getContents() {
  const targetDirs = config.contentDirectories;
  var results = [];
  for (const dir of targetDirs) {
    const r = searchContents(dir);
    results = results.concat(r);
  }
  return results;
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

