let ipcRenderer;
if (window.require) {
  const electron = window.require('electron');
  ipcRenderer = electron.ipcRenderer;
}

let requestId = 0;
const timeoutMilSec = 30000; // 30 seconds

const channelSend = 'FunctionCall';

export default class IpcClient {
  sendRequest(method, params) {
    requestId++;
    return new Promise((resolve, reject) => {
      ipcRenderer.send(channelSend, method, requestId, params);
      const listener = (event, result, error) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(result);
      };
      const channelRecv = `${method}_${requestId}`;
      ipcRenderer.once(channelRecv, listener);
      setTimeout(() => {
        ipcRenderer.removeListener(channelRecv, listener);
        reject({message: "response too late",
                name: 'TimeOutError'});
      }, timeoutMilSec);
    });
  }

  getBooks() {
    return this.sendRequest('getBooks');
  }

  getBookThumbnail(path) {
    return this.sendRequest('getBookThumbnail', path)
      .then(result => {
        result.data = new Blob([result.data]);
        return result;
      })
      .catch(err => {
        return { message: err };
      });
  }

  openBook(path) {
    return this.sendRequest('openBook', path)
      .then(result => {
        return result;
      });
  }

  setStar(vpath, state) {
    return this.sendRequest('setStar', [vpath, state])
      .then(result => {
        return result;
      });
  }
}

