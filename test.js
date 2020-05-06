const ebmgr = require('./ebmgr');
const fs = require('fs');

ebmgr.getBooks().then(items => {
  for (const item of items) {
    if (item.path.endsWith('zip')) {
      console.log(item);
      ebmgr.openBook(item.path).then(
        thumb => {
          console.log("ok");
        },
        error => {
          console.log(error);
        }
      );
      break;
    }
  }
});

