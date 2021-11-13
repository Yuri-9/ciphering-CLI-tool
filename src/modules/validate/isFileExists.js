const fs = require('fs');
const CustomerError = require('../customerError/customerError');

const isFileExists = (path) => {
  return new Promise((res, rej) => {
    if (fs.existsSync(path)) {
      res(path);
    }
    rej(new CustomerError(`"${path}" file doesn't exist`));
  });
};

module.exports = isFileExists;
