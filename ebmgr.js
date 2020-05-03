const config = require('./config.json');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const gs = require('ghostscript4js');

function getHash(targetDir) {
  const hash = crypto.createHash('md5');
  hash.update(targetDir);
  return hash.digest('hex');
}

exports.generateThumbnail = function generateThumbnail(vpath, page) {
  page = page || 1;
  const realPath = _vpathToRealPath(vpath);
  const target = path.parse(realPath);
  const outputPath = path.join(target.dir, target.name + '.jpeg');

  const gsCmd = [ "-sDEVICE=jpeg",
                  "-o",
                  outputPath,
                  "-sDEVICE=jpeg",
                  "-r72",
                  `-dFirstPage=${page}`,
                  `-dLastPage=${page}`,
                  realPath];

  gs.executeSync(gsCmd);
  return outputPath;
};

function _vpathToRealPath(vpath) {
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

