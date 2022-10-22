const fs = require('fs');
const path = require('path');
const AdmZip = require('adm-zip');

async function inspect(realPath, type=null) {
  const ext = path.extname(realPath).toLowerCase();
  const basename = path.basename(realPath, ext);
  
  if (!type) {
    if (ext == '.zip' || ext == '.cbz') {
      type = 'zip';
    }
  }

  let entry;
  if (type == 'zip') {
    entry = await inspectZip(realPath);
  } else {
    throw Error('invalid argument');
  }

  entry.type = type;
  entry.title = basename;

  return entry;
}

async function inspectZip(realPath) {
  const zip = new AdmZip(realPath);
  const rex_jpg = /(\.jpeg|\.jpg)$/i;
  const rex_png = /(\.png)$/i;

  let count = 0;
  for (const entry of zip.getEntries()) {
    // ignore __MACOSX directory
    if (entry.entryName.startsWith('__MACOSX/')) {
      continue;
    }
    if (!entry.isDirectory && rex_jpg.test(entry.entryName)) {
      count++;
      continue;
    }
    if (!entry.isDirectory && rex_png.test(entry.entryName)) {
      count++;
      continue;
    }
  }

  const result = {
    pages: count,
  };

  return result;

}

module.exports.inspect = inspect;
