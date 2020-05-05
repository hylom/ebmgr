const ebmgr = require('./ebmgr');
const fs = require('fs');

ebmgr.getBooks().then(items => {
  for (const item of items) {
    if (item.path.endsWith('pdf')) {
      console.log(item);
      ebmgr.getBookThumbnail(item.path).then(thumb => {
        console.log(thumb);
        fs.writeFileSync("./hoge.jpeg", thumb.data, {encoding: null});
      });
      break;
    }
  }
});

