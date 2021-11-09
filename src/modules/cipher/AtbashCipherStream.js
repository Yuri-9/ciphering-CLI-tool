const { Transform } = require('stream');
const atbashCipher = require('./atbashCipher');

class AtbashCipherStream extends Transform {
  constructor(options = {}) {
    const optionsNew = { ...options, decodeString: false };
    super(optionsNew);
  }

  _transform(chunk, encoding, callback) {
    const cipheredChunk = atbashCipher(chunk.toString('utf-8'));
    this.push(Buffer.from(cipheredChunk));
    callback();
  }
}

module.exports = AtbashCipherStream;
