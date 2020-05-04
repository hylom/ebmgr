const ebmgr = require('./ebmgr');
const fs = require('fs');

const items = ebmgr.getContents();
for (const item of items) {
  if (item.path.endsWith('zip')) {
    console.log(item);
    const thumb = ebmgr.getThumbnail(item.path);
    console.log(thumb);
    fs.writeFileSync("./hoge.jpeg", thumb.data, {encoding: null});
    break;
  }
}

