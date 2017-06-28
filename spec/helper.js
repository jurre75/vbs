var path = require('path');

module.exports = {
  appPath: function() {
    switch (process.platform) {
      case 'darwin':
        return path.join(__dirname, '..', '.tmp', 'mac', 'Vbs.app', 'Contents', 'MacOS', 'Vbs');
      case 'linux':
        return path.join(__dirname, '..', '.tmp', 'linux', 'Vbs');
      default:
        throw 'Unsupported platform';
    }
  }
};
