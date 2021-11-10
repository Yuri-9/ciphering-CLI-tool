const fs = require('fs');
const { pipeline } = require('stream');
const CaesarCipherStream = require('../cipher/CaesarCipherStream');
const ROT8CipherStream = require('../cipher/ROT8CipherStream');
const AtbashCipherStream = require('../cipher/AtbashCipherStream');
const { CHAR_CAESAR, CHAR_ROT8, CHAR_ATBASH, SHIFT_CAESAR, SHIFT_ROT8 } = require('../../const');

class Streams {
  constructor(config, inputFile, outputFile) {
    this.config = config;
    this.inputFile = inputFile;
    this.outputFile = outputFile;
    this.readStream =
      inputFile === null
        ? process.stdin
        : fs.createReadStream(this.inputFile, {
            encoding: 'utf8',
            highWaterMark: 10,
          });
    this.writeStream = fs.createWriteStream(this.outputFile, {
      encoding: 'utf8',
      flags: 'a',
    });
  }

  createChainTransformStreams() {
    const transformStreams = this.config.split('-').map((item) => {
      switch (item[0]) {
        case CHAR_CAESAR: {
          const shift = +item[1] ? SHIFT_CAESAR : -SHIFT_CAESAR;
          return new CaesarCipherStream({ highWaterMark: 10 }, shift);
        }
        case CHAR_ROT8: {
          const shift = +item[1] ? SHIFT_ROT8 : -SHIFT_ROT8;
          return new ROT8CipherStream({ highWaterMark: 10 }, shift);
        }
        case CHAR_ATBASH: {
          return new AtbashCipherStream({ highWaterMark: 10 });
        }
        default: {
          return new CaesarCipherStream({ highWaterMark: 10 }, 0);
        }
      }
    });
    return transformStreams;
  }

  async runPipeline() {
    const pipeline2 = new Promise((res, rej) => {
      pipeline(
        [this.readStream, ...this.createChainTransformStreams(), this.writeStream],
        (err) => {
          if (err) {
            rej(err);
          }
          res();
        }
      );
    });
    await pipeline2;
    fs.appendFile('./output.txt', '\n', () => {});
  }
}

module.exports = Streams;
