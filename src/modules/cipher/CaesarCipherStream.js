const { Transform } = require('stream');
const { caesarCipher } = require('./caesarCipher');

class CaesarCipherStream extends Transform {
  constructor(options = {}, shift) {
    const optionsNew = { ...options, decodeString: false };
    super(optionsNew);
    this.shift = shift;
  }

  _transform(chunk, encoding, callback) {
    const cipheredChunk = caesarCipher(chunk.toString('utf-8'), this.shift);
    this.push(cipheredChunk);
    callback();
  }
}

module.exports = CaesarCipherStream;
