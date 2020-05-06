const { app, BrowserWindow, protocol, ipcMain } = require('electron');
const path = require('path');
const ebmgr = require('./ebmgr');

function createWindow () {
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });

  if (process.env.EBM_MODE == 'development') {
    win.loadURL('http://localhost:3333/index.html');
    win.webContents.openDevTools();
  } else {
    win.loadFile('./public/index.html');
  }
}

app.whenReady().then(createWindow);

//a 全てのウィンドウが閉じられた時に終了します。
app.on('window-all-closed', () => {
  // macOSでは、ユーザが Cmd + Q で明示的に終了するまで、
  // アプリケーションとそのメニューバーは有効なままにするのが一般的です。
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // macOSでは、ユーザがドックアイコンをクリックしたとき、
  // そのアプリのウインドウが無かったら再作成するのが一般的です。
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

const channelSend = 'FunctionCall';

ipcMain.on(channelSend, (event, method, requestId, params) => {
  const channelRecv = `${method}_${requestId}`;
  if (method == 'getBooks') {
    ebmgr.getBooks().then(
      result => {
        event.reply(channelRecv, result);
      },
      error => {
        event.reply(channelRecv, undefined, error);
      }
    );
    return;
  } else if (method == 'getBookThumbnail') {
    ebmgr.getBookThumbnail(params).then(
      result => {
        event.reply(channelRecv, result);
      },
      error => {
        event.reply(channelRecv, undefined, error);
      }
    );
    return;
  } else if (method == 'openBook') {
    const vpath = params;
    ebmgr.openBook(params).then(
      result => {
        event.reply(channelRecv, result);
      },
      error => {
        event.reply(channelRecv, undefined, error);
      }
    );
    return;
  }
  event.reply(channelRecv, undefined, { message: "method not found",
                                        name: "InvalidMethodError" });
});
