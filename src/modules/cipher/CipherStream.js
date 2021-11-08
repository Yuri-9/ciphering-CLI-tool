const { Transform } = require('stream');

class CipherStream extends Transform {
  constructor(options = {}, cipherFn, shift = 0) {
    const optionsNew = { ...options, decodeString: false };
    super(optionsNew);
    this.cipherFn = cipherFn;
    this.shift = shift;
  }

  _transform(chunk, encoding, callback) {
    const cipheredChunk = this.cipherFn(chunk.toString('utf-8'), this.shift);
    this.push(Buffer.from(cipheredChunk));
    callback();
  }
}

module.exports = CipherStream;
