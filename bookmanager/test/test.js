const chai = require("chai");
chai.use(require("chai-as-promised"));
chai.should();
const assert = require('assert');

const BookManager = require('../bookmanager');
const path = require('path');
const fs = require('fs');

const config = {
  "targetExtentions": [ ".pdf", ".zip", ".cbz" ],
  "contentDirectories" : [ path.join(__dirname, "data"), ],
  "viewers": {
    "_.pdf": "/Applications/Preview.app",
    "_.zip": "/Applications/Preview.app",
    "_.cbz": "/Applications/Preview.app"
  },
  "cacheDirectory": path.join(__dirname, "cache"),
  "jsonMetadataPath": path.join(__dirname, "data", "metadata.json"),
};

const bm = new BookManager(config);

describe('BookManager', function () {

  describe('pre-condition check', function () {
    describe('test data directory', function () {
      it('can open', function () {
        return fs.promises.opendir(config.contentDirectories[0])
          .should.be.fulfilled
          .then(fp => { fp.close(); });
      });
    });
  });
  
  describe('#getBooks', function () {
    it('should be fulfillled', function () {
      return bm.getBooks().should.be.fulfilled;
    });
  });

  describe('#getRootDirectories', function () {
    it('should return one directory', function () {
      assert.equal(bm.getRootDirectories().length, 1);
    });
  });

  describe('#getDirectoryTree', function () {
    it('should return valid value', function () {
      const d = bm.getRootDirectories();
      const expect = {};
      expect[d[0]] = { sub_dir: { sub_sub_dir: {} }, sub_dir2: {} };
      return bm.getDirectoryTree().should.eventually.to.deep.equal(expect);
    });
  });

  describe('#setStar', function () {
    it('should be fulfilled', function () {
      const d = bm.getRootDirectories();
      const target = d[0] + "/sub_dir/test_jpg.zip";
      return bm.setStar(target, true).should.be.fulfilled;
    });
    it('should be succeeded to set star', function () {
      const d = bm.getRootDirectories();
      const target = d[0] + "/sub_dir/test_jpg.zip";
      return bm.db.getEntry(target).should.eventually.have.property("starred").to.be.true;
    });
  });

  describe('#getBookThumbnail', function () {
    it('should return thumbnail', function () {
      const d = bm.getRootDirectories();
      const target = d[0] + "/sub_dir/test_jpg.zip";
      return bm.getBookThumbnail(target).should.be.fulfilled;
    });
  });

});
