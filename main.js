const {app, BrowserWindow, ipcMain, Notification} = require("electron");
const path = require("path");

let mainWindow;
let authWindow = null;

// OAuth 로그인을 위한 창 생성 함수를 밖으로 이동
function createAuthWindow(authUrl) {
  // 기존 인증 창이 있다면 닫기
  if (authWindow) {
    authWindow.close();
  }

  authWindow = new BrowserWindow({
    width: 500,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  authWindow.loadURL(authUrl);

  // 창이 닫힐 때 참조 제거
  authWindow.on('closed', () => {
    authWindow = null;
  });

  return authWindow;
}

// OAuth 핸들러를 밖으로 이동하고 전역적으로 설정
ipcMain.handle('google-auth', async (event, authUrl) => {
  return new Promise((resolve, reject) => {
    try {
      const window = createAuthWindow(authUrl);

      const handleRedirect = (event, url) => {
        if (url.startsWith('your-redirect-url')) {
          const rawCode = /code=([^&]*)/.exec(url) || null;
          const code = rawCode && rawCode.length > 1 ? rawCode[1] : null;

          // 인증 창 정리
          if (authWindow) {
            authWindow.destroy();
            authWindow = null;
          }

          // 이벤트 리스너 정리
          window.webContents.removeListener('will-redirect', handleRedirect);

          resolve(code);
        }
      };

      window.webContents.on('will-redirect', handleRedirect);

      // 에러 처리
      window.webContents.on('did-fail-load',
          (event, errorCode, errorDescription) => {
            reject(new Error(`Failed to load: ${errorDescription}`));
          });

    } catch (error) {
      reject(error);
    }
  });
});

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 450,
    height: 700,
    minWidth: 450,
    minHeight: 700,
    frame: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  // React 앱 로드
  const startUrl =
      process.env.ELECTRON_START_URL ||
      `file://${path.join(__dirname, "../build/index.html")}`;
  mainWindow.loadURL(startUrl);

  // 개발 환경에서만 개발자 도구 활성화
  if (process.env.NODE_ENV === "development") {
    mainWindow.webContents.openDevTools();
  }

  // 윈도우 컨트롤 이벤트 리스너
  ipcMain.on("window-minimize", () => {
    mainWindow.minimize();
  });

  ipcMain.on("window-maximize", () => {
    if (mainWindow.isMaximized()) {
      mainWindow.unmaximize();
    } else {
      mainWindow.maximize();
    }
  });

  ipcMain.on("window-close", () => {
    mainWindow.close();
  });

  // 알림 이벤트 리스너
  ipcMain.on("show-notification", (event, {title, body}) => {
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
            "Content-Security-Policy": [
              "default-src 'self' https://*.google.com https://*.googleapis.com https://*.firebaseapp.com",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.google.com https://*.googleapis.com https://apis.google.com https://*.firebaseapp.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "img-src 'self' data: https://secure.gravatar.com https://*.google.com https://*.googleapis.com https://*.firebaseapp.com",
              "connect-src 'self' https://*.google.com https://*.googleapis.com https://securetoken.googleapis.com https://identitytoolkit.googleapis.com https://*.firebaseapp.com",
              "frame-src 'self' https://*.google.com https://accounts.google.com https://*.firebaseapp.com"
            ].join("; "),
          },
        });
      }
  );
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// 예기치 않은 오류 처리
process.on("uncaughtException", (error) => {
  console.error("Application error:", error);
});