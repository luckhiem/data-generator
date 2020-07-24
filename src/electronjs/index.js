import { app, BrowserWindow, ipcMain } from 'electron';
const prepareTestData = require('kintone-test-preparation');
const fs = require('fs');
const path = require('path');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  // eslint-disable-line global-require
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    height: 768,
    width: 1024,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // and load the index.html of the app.

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

// app.commandLine.appendSwitch("proxy-server","localhost:3000")

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
// Event listener for kintone
ipcMain.on('request-to-kintone', async (event, arg) => {
  try {
    const config = {
      "domain": arg.domain,
      "proxy": {
        "host": "dc-ty3-squid-1.cb.local",
        "ip": "10.224.136.40",
        "port": 3128
      },
      "administrators": {
        "username": arg.username,
        "password": arg.password
      }
    }
    await prepareTestData.prepareTestData(config);
    const data = await fs.readFileSync(path.join(__dirname, '../../resource/config.json'));
    const log = await fs.readFileSync(path.join(__dirname, '../../resource/log.txt'), 'utf8');
    await event.reply('kintone-reply', { status: 'DONE', config: JSON.parse(data), log: log });
    return event;
  } catch (err) {
    console.log(err)
    event.reply('kintone-reply', { status: 'ERROR' });
  }
});