const electron = require('electron');
const url = require('url');
const path = require('path');

let mainWindow;

const {app, BrowserWindow} = electron;

app.on('ready', function(){
  mainWindow = new BrowserWindow({
    height: 630,
    width: 800
  });
  mainWindow.loadURL(url.format(
      {
        pathname: path.join(__dirname, 'main.html'),
        protocol: 'file:',
        slashes: true
      }
  ));
  //mainWindow.setMenu(null);
});