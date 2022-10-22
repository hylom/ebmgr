const chai = require('chai');
chai.use(require('chai-as-promised'));
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


// clean up for test
fs.rmSync(config.cacheDirectory,
          { recursive: true, force: true });

describe('BookManager', function () {
  const bm = new BookManager(config);

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
      const expects = [
        { title: 'test_jpg',
          vpath: 'main/sub_dir/test_jpg.zip' },
        { title: 'test_pdf',
          vpath: 'main/test_pdf.pdf' },
        { title: 'test_png',
          vpath: 'main/test_png.zip' },
      ];
      //return bm.getBooks().should.be.fulfilled;
      return bm.getBooks().should.eventually.to.have.lengthOf(3)
        .and.satisfy(books => {
          for (const v of expects) {
            const r = books.find(b => (b.title == v.title));
            if (!r || r.vpath != v.vpath) {
              return false;
            }
          }
          return true;
        }, 'result is not expected');
    });
  });

  describe('#getRootDirectories', function () {
    it('should return one directory', function () {
      const d = bm.getRootDirectories();
      d.should.be.an('array');
      d.should.have.lengthOf(1);
      d.should.have.members(['main']);
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
      const target = d[0] + '/sub_dir/test_jpg.zip';
      return bm.setStar(target, true).should.be.fulfilled;
    });
    it('should be succeeded to set star', function () {
      const d = bm.getRootDirectories();
      const target = d[0] + '/sub_dir/test_jpg.zip';
      return bm.getEntry(target).should.eventually.have.property('starred').to.be.true;
    });
  });

  describe('#getBookThumbnail', function () {
    it('should return thumbnail', function () {
      const d = bm.getRootDirectories();
      const target = d[0] + '/sub_dir/test_jpg.zip';
      return bm.getBookThumbnail(target).should.be.fulfilled;
    });
  });

  describe('#getBook', function () {
    it('should be fulfillled (1)', function () {
      const d = bm.getRootDirectories();
      const target = d[0] + '/sub_dir/test_jpg.zip';
      return bm.getEntry(target)
        .should.eventually.have.property('starred');
    });

    it('should be fulfillled (2)', function () {
      const d = bm.getRootDirectories();
      const target = d[0] + '/test_png.zip';
      const result = bm.getEntry(target);

      return Promise.all([
        result.should.eventually.have.property('pages', 4),
        result.should.eventually.have.property('type', 'zip'),
        result.should.eventually.have.property('title', 'test_png'),
      ]);
    });
  });

  describe('#getPage', function () {
    it('should be fulfillled (1)', function () {
      const d = bm.getRootDirectories();
      const target = d[0] + '/test_png.zip';
      const result = bm.getPage(target, 1);
      return Promise.all([
        result.should.eventually.have.property('type', 'png'),
        result.should.eventually.have.property('binData'),
      ]);
    });
  });

});
