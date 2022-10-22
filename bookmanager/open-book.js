const child_process = require('child_process');

module.exports.openBookMixinBuilder = Base => class extends Base {
  openBook(vpath) {
    // check given path
    const realPath = this._vpathToRealPath(vpath);
    if (!realPath) {
      return Promise.reject({
        status: 404,
        message: `cannot open book: ${realPath}`
      });
    }

    const openCmd = '/usr/bin/open';
    const args = [ realPath ];
    const opts = {};
    const viewer = this._getViewer(vpath);

    if (viewer && viewer.length) {
      args.push('-a');
      args.push(viewer);
    }

    return new Promise((resolve, reject) => {
      child_process.execFile(openCmd, args, opts,
                             (error, stdout, stderr) => {
                               if (error) {
                                 reject(error);
                                 return;
                               }
                               resolve();
                             });
    });
  }

  _getViewer(vpath) {
    const ext = path.extname(vpath).toLowerCase();
    const viewers = this.config.viewers;
    return viewers[ext];
  }

};
