const { app, BrowserWindow, protocol } = require('electron');
const path = require('path');

// use ./public as root directory
app.on('ready', () => {
  protocol.interceptFileProtocol(
    'file',
    (req, callback) => {
      const url = req.url.substr(7);
      callback({ path: path.normalize(__dirname + "/public/" + url)});
    },
    error => {
      if (error) {
        console.error('Failed to register protocol');
      }
    });
});

function createWindow () {
  // ブラウザウインドウを作成
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });

  // そしてこのアプリの index.html をロード
  win.loadURL('file:///index.html');

  win.webContents.openDevTools();
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
