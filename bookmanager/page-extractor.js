const fs = require('fs');
const path = require('path');
const AdmZip = require('adm-zip');

async function getPage(realPath, page, type=null) {
  const ext = path.extname(realPath).toLowerCase();
  const basename = path.basename(realPath, ext);
  
  if (!type) {
    if (ext == '.zip' || ext == '.cbz') {
      type = 'zip';
    }
  }

  let result;
  if (type == 'zip') {
    result = await getPageZip(realPath, page);
  } else {
    throw Error('invalid argument');
  }

  return result;
}

async function getPageZip(realPath, page) {
  const zip = new AdmZip(realPath);
  const rex_jpg = /(\.jpeg|\.jpg)$/i;
  const rex_png = /(\.png)$/i;

  let count = 0;
  for (const entry of zip.getEntries()) {
    console.log(entry.entryName);
    if (entry.isDirectory) {
      continue;
    }
    let type = null;
    if (rex_jpg.test(entry.entryName)) {
      type = 'jpeg';
    } else if (rex_png.test(entry.entryName)) {
      type = 'png';
    }

    if (type) {
      if (page == count) {
        return { type, binData: entry.getData() };
      }
      count++;
    }
  }

  throw Error('not_found');
}

module.exports.getPage = getPage;
