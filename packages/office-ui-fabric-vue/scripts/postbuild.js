var fs = require('fs-extra');

fs.moveSync("./lib/tmp/", './_tmp', { overwrite: true });
fs.moveSync('./_tmp', './lib', { overwrite: true });