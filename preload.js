const {contextBridge, ipcRenderer} = require('electron');

// Expose APIs to renderer process
contextBridge.exposeInMainWorld('electron', {
  // 알림 관련
  notification: {
    show: (title, body) => ipcRenderer.send('show-notification', {title, body}),
  },
  // 윈도우 컨트롤
  window: {
    minimize: () => ipcRenderer.send('window-minimize'),
    maximize: () => ipcRenderer.send('window-maximize'),
    close: () => ipcRenderer.send('window-close'),
  }
});

// DOMContentLoaded 이벤트 핸들러
window.addEventListener('DOMContentLoaded', () => {

});