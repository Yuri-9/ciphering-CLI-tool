const { Transform } = require('stream');
const atbashCipher = require('./atbashCipher');

class AtbashCipherStream extends Transform {
  constructor(options = {}) {
    super({ ...options, decodeString: false });
  }

  _transform(chunk, encoding, callback) {
    const cipheredChunk = atbashCipher(chunk.toString('utf-8'));
    this.push(cipheredChunk);
    callback();
  }
}

module.exports = AtbashCipherStream;
