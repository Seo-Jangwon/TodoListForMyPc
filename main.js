const { app, BrowserWindow } = require('electron')
const path = require('path')

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 320,
    height: 450,
    frame: false,
    transparent: true,
    backgroundColor: '#00ffffff', // 투명도 지원을 위해 추가
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false
    }
  })

  // React 앱 로드
  mainWindow.loadURL('http://localhost:3000')

  // 개발자 도구
  mainWindow.webContents.openDevTools()

  // 로드 실패 시 재시도
  mainWindow.webContents.on('did-fail-load', () => {
    console.log('Failed to load application, retrying...')
    setTimeout(() => mainWindow.reload(), 1000)
  })

  // 콘텐츠가 준비되면 창 표시
  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.show()
  })

  // 오류 로깅
  mainWindow.webContents.on('console-message', (event, level, message) => {
    console.log('Renderer Process:', message)
  })

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

// 앱이 준비되면 창 생성
app.whenReady().then(() => {
  createWindow()
  
  // macOS에서의 동작 처리
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

// 모든 창이 닫히면 앱 종료
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// 예기치 않은 오류 처리
process.on('uncaughtException', (error) => {
  console.error('Application error:', error)
})