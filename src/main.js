/*
    Electron app entrypoint
    By Zoey Désautels
*/

const {BrowserWindow, app} = require('electron');

let MainWindow;

app.on('ready', () => {
    MainWindow = new BrowserWindow({
        webPreferences: {
            devTools: true
        },
        show: false,
        title: "BooruBrowser",
        backgroundColor: "#212121"
    });

    MainWindow.loadFile("src/browser.html");
    MainWindow.setMenu(null);
    MainWindow.on('ready-to-show', () => {
        MainWindow.show();
        MainWindow.webContents.openDevTools();
    });
});

app.on('window-all-closed', () => {
    MainWindow = null;
    app.exit(0);
});