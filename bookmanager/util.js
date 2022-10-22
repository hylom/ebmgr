const path = require('path');


function vpathToRealPath(config, vpath) {
  const m = /^([^/]*)(\/.*)$/.exec(vpath);
  if (m) {
    const alias = m[1];
    for (const dir in config.contentDirectory) {
      if (dir == alias) {
        return path.join(config.contentDirectory[dir], m[2]);
      }
    }
  }
  return undefined;
}

module.exports.vpathToRealPath = vpathToRealPath;
