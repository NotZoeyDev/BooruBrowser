/**
 * Electron's app entrypoint
 * By: @ZoeyLovesMiki, 2019
 */

// Electron imports
const {BrowserWindow, app} = require('electron');

// Our Electron window
let window;

app.on('ready', () => {
    window = new BrowserWindow({
        webPreferences: {
            devTools: true,
            nodeIntegration: true
        },
        show: false,
        title: "BooruBrowser",
        backgroundColor: "#212121"
    });

    window.loadFile("src/browser.html");
    
    window.setMenu(null);

    window.on('ready-to-show', () => {
        window.show();
    });
});

app.on('window-all-closed', () => {
    window = null;
    app.exit(0);
});