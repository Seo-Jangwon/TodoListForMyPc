const {app, BrowserWindow, ipcMain, Notification} = require("electron");
const path = require("path");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 320,
    height: 450,
    frame: false,
    transparent: true,
    backgroundColor: "#00ffffff",
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true,
      preload: path.join(__dirname, 'preload.js')
    },
  });

  // React 앱 로드
  const startUrl = process.env.ELECTRON_START_URL || `file://${path.join(
      __dirname, '../build/index.html')}`;
  mainWindow.loadURL(startUrl);

  // 개발 환경에서만 개발자 도구 활성화
  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools();
  }

  // 윈도우 컨트롤 이벤트 리스너
  ipcMain.on('window-minimize', () => {
    mainWindow.minimize();
  });

  ipcMain.on('window-maximize', () => {
    if (mainWindow.isMaximized()) {
      mainWindow.unmaximize();
    } else {
      mainWindow.maximize();
    }
  });

  ipcMain.on('window-close', () => {
    mainWindow.close();
  });

  // 알림 이벤트 리스너
  ipcMain.on('show-notification', (event, {title, body}) => {
    if (Notification.isSupported()) {
      new Notification({
        title,
        body,
        icon: path.join(__dirname, "icon.png"),
      }).show();
    }
  });

  mainWindow.webContents.session.webRequest.onHeadersReceived(
      (details, callback) => {
        callback({
          responseHeaders: {
            ...details.responseHeaders,
            'Content-Security-Policy': [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: https://secure.gravatar.com"
            ].join('; ')
          }
        });
      });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// 예기치 않은 오류 처리
process.on('uncaughtException', (error) => {
  console.error('Application error:', error);
});