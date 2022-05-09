const { app, BrowserWindow } = require('electron');

let window;

function createWindow() {
    // Creates the browser window.
    window = new BrowserWindow({
        width: 800,
        height: 600,
    });

    // Loads the index.html of the app at this port
    window.loadURL('http://localhost:3000');

    // Open the DevTools
    window.webContents.openDevTools({ mode: 'detach' });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
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