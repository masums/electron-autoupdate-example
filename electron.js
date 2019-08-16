//This is test electron app
const {app, BrowserWindow, ipcMain} = require('electron');
const {autoUpdater} = require("electron-updater");
let win; // this wills store the window object

function createDefaultWindow() {
    win = new BrowserWindow({width: 900, height: 680, webPreferences: {
      nodeIntegration: true,
    }});
    win.loadURL(`file://${__dirname}/index.html`);
    win.on('closed', () => app.quit());
  return win;
}

// when the update is ready, notify the BrowserWindow
autoUpdater.on('update-downloaded', (info) => {
  console.log("update found");  
  win.webContents.send('updateReady')
});
app.on('ready', function() {
  createDefaultWindow();
  console.log("checking update");
  autoUpdater.checkForUpdates();
});
ipcMain.on("quitAndInstall", (event, arg) => {
    autoUpdater.quitAndInstall();
})
