const { app, BrowserWindow, protocol, ipcMain } = require('electron');
const path = require('path');
const BookManager = require('../bookmanager/bookmanager.js');
const config = require('../config.json');
const ebmgr = new BookManager(config);

function createWindow () {
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });

  if (process.env.EBM_MODE == 'development') {
    win.loadURL('http://localhost:3000/index.html');
    win.webContents.openDevTools();
  } else if (process.env.EBM_MODE == 'development-rc') {
    win.loadFile('./public/index.html');
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

  function _call(promise) {
    promise.then(
      result => {
        event.reply(channelRecv, result);
      },
      error => {
        event.reply(channelRecv, undefined, error);
      });
  }
  
  if (method == 'getBooks') {
    _call(ebmgr.getBooks());
    return;
  }

  if (method == 'getBookThumbnail') {
    _call(ebmgr.getBookThumbnail(params));
    return;
  }

  if (method == 'openBook') {
    const vpath = params;
    _call(ebmgr.openBook(params));
    return;
  }

  if (method == 'setStar') {
    const vpath = params[0];
    const state = params[1];
    _call(ebmgr.setStar(vpath, state));
    return;
  }

  if (method == 'getDirectories') {
    _call(ebmgr.getDirectories());
    return;
  }

  event.reply(channelRecv, undefined, { message: "method not found",
                                        name: "InvalidMethodError" });
});
