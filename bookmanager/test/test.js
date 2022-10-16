const chai = require("chai");
chai.use(require("chai-as-promised"));
chai.should();
const assert = require('assert');

const BookManager = require('../bookmanager');
const path = require('path');
const fs = require('fs');

const config = {
  "targetExtentions": [ ".pdf", ".zip", ".cbz" ],
  "contentDirectory" : { "main": path.join(__dirname, "data"), },
  "viewers": {
    "_.pdf": "/Applications/Preview.app",
    "_.zip": "/Applications/Preview.app",
    "_.cbz": "/Applications/Preview.app"
  },
  "cacheDirectory": path.join(__dirname, "tmp", "cache")
  //"jsonMetadataPath": path.join(__dirname, "tmp", "data", "metadata.json"),
};

const bm = new BookManager(config);

describe('BookManager', function () {

  describe('pre-condition check', function () {
    describe('test data directory', function () {
      it('can open', function () {
        return fs.promises.opendir(config.contentDirectory.main)
          .should.be.fulfilled
          .then(fp => { fp.close(); });
      });
    });
  });
  
  describe('#getBooks', function () {
    it('should be fulfillled', function () {
      const expect = [
        { title: 'test_jpg',
          vpath: 'main/sub_dir/test_jpg.zip' },
        { title: 'test_pdf',
          vpath: 'main/test_pdf.pdf' },
        { title: 'test_png',
          vpath: 'main/test_png.zip' },
      ];
      //return bm.getBooks().should.be.fulfilled;
      return bm.getBooks().should.eventually.to.deep.equal(expect);
    });
  });

  describe('#getRootDirectories', function () {
    it('should return one directory', function () {
      assert.equal(bm.getRootDirectories().length, 1);
    });
  });

  describe('#getDirectories', function () {
    it('should return valid value', function () {
      const d = bm.getRootDirectories();
      const expect = {};
      expect[d[0]] = { sub_dir: { sub_sub_dir: {} }, sub_dir2: {} };
      return bm.getDirectories().should.eventually.to.deep.equal(expect);
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

  describe('#getBook', function () {
    it('should be fulfillled', function () {
      const d = bm.getRootDirectories();
      const target = d[0] + "/sub_dir/test_jpg.zip";
      return bm.db.getEntry(target)
        .should.eventually.have.property("starred");
    });
  });

});
