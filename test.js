const ebmgr = require('./ebmgr');

const items = ebmgr.getContents();
for (const item of items) {
  if (item.path.endsWith('pdf')) {
    console.log(item);
    const path = ebmgr.generateThumbnail(item.path);
    console.log(path);
    break;
  }
}

