var os = require('os');
var WINDOWS_PATH = 'C:/users/alienware/desktop/test';
var NIX_PATH = process.env.HOME + '/Desktop/test/';
module.exports = {
  'fccPath': os.platform() === 'win32' ? WINDOWS_PATH : NIX_PATH
};
