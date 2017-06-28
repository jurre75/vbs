var electron, path, json;

path = require('path');
json = require('../../package.json');

var log = require('electron-log');
const fs = require('fs');

log.transports.file.level = 'debug';
log.transports.file.format = '{h}:{i}:{s}:{ms} {text}';

// Set approximate maximum log size in bytes. When it exceeds,
// the archived log will be saved as the log.old.log file
log.transports.file.maxSize = 5 * 1024 * 1024;

// Write to this file, must be set before first logging
//log.transports.file.file = __dirname + '/vbs.log';

// fs.createWriteStream options, must be set before first logging
log.transports.file.streamConfig = { flags: 'a' };

// set existed file stream
log.transports.file.stream = fs.createWriteStream('vbs.log');

log.info('Hello, log');
log.info('Hello, log2');

electron = require('electron');

electron.app.on('ready', function() {
  var window;

  window = new electron.BrowserWindow({
    title: json.name,
    width: json.settings.width,
    height: json.settings.height
  });

  window.loadURL('file://' + path.join(__dirname, '..', '..') + '/index.html');

  window.webContents.on('did-finish-load', function(){
    window.webContents.send('loaded', {
      appName: json.name,
      electronVersion: process.versions.electron,
      nodeVersion: process.versions.node,
      chromiumVersion: process.versions.chrome
    });
  });

  window.on('closed', function() {
    window = null;
  });

});
