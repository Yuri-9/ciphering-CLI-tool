const { Writable } = require('stream');
const fs = require('fs');

class CustomWriteStream extends Writable {
  constructor(filename, options) {
    super(options);
    this.filename = filename;
    this.setDefaultEncoding = 'utf8';
  }

  _construct(callback) {
    fs.open(this.filename, 'a', (err, fd) => {
      if (err) {
        callback(err);
      } else {
        this.fd = fd;
        callback();
      }
    });
  }

  _write(chunk, enc, callback) {
    fs.write(this.fd, chunk, callback);
  }

  _destroy(err, callback) {
    if (this.fd) {
      fs.close(this.fd, (er) => callback(er || err));
    } else {
      callback(err);
    }
  }
}

module.exports = CustomWriteStream;
