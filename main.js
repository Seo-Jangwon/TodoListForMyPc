const { app, BrowserWindow, ipcMain, Notification } = require("electron");
const path = require("path");
const fs = require("fs");
const { defaultColorScheme } = require("./src/constants/defaultColorScheme");

const userDataPath = app.getPath("userData");
const colorSchemePath = path.join(userDataPath, "colors.json");

// 색상 스키마 저장
ipcMain.on("save-color-scheme", (event, colorScheme) => {
  fs.writeFileSync(colorSchemePath, JSON.stringify({ theme: colorScheme }));
});

// 색상 스키마 불러오기
function loadColorScheme() {
  try {
    const userColorScheme = JSON.parse(
      fs.readFileSync(colorSchemePath, "utf8")
    );

    return { theme: { ...defaultColorScheme.theme, ...userColorScheme.theme } };
  } catch (error) {
    return { theme: { ...defaultColorScheme.theme } };
  }
}

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 320,
    height: 450,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false,
    },
  });

  // React 앱 로드
  mainWindow.loadURL("http://localhost:3000");

  mainWindow.webContents.on("did-finish-load", () => {
    setTimeout(() => {
      mainWindow.webContents.send("check-due-dates");
    }, 1000);
  });

  // 로드 실패 시 재시도
  mainWindow.webContents.on("did-fail-load", () => {
    console.log("Failed to load application, retrying...");
    setTimeout(() => mainWindow.reload(), 1000);
  });

  // 색상 스키마 적용
  mainWindow.webContents.on("dom-ready", () => {
    const colors = loadColorScheme().theme;
    const cssVars = Object.entries(colors)
      .map(([key, value]) => `--color-${key}: ${value};`)
      .join(";");

    mainWindow.webContents.executeJavaScript(
      `document.documentElement.style.cssText = \`${cssVars}\`;`
    );
  });

  // 콘텐츠가 준비되면 창 표시
  mainWindow.webContents.on("did-finish-load", () => {
    mainWindow.show();
  });

  // 오류 로깅
  mainWindow.webContents.on("console-message", (event, level, message) => {
    console.log("Renderer Process:", message);
  });
}

// 알림 처리
ipcMain.on("show-notification", (event, { title, body }) => {
  if (Notification.isSupported()) {
    new Notification({
      title,
      body,
      icon: path.join(__dirname, "icon.png"), // 아이콘이 있는 경우
    }).show();
  }
});

// 앱이 준비되면 창 생성
app.whenReady().then(() => {
  createWindow();

  // macOS에서의 동작 처리
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// 모든 창이 닫히면 앱 종료
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// 예기치 않은 오류 처리
process.on("uncaughtException", (error) => {
  console.error("Application error:", error);
});
