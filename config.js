var dotenv = require('dotenv');
dotenv.load();

module.exports = {
  'fccPath': process.cwd().substr(0, process.cwd().lastIndexOf('/'))
    + '/' + process.env.FCC_FOLDER_NAME + '/seed/challenges/'
};

