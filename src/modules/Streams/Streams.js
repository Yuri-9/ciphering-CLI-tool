const fs = require('fs');
const { pipeline } = require('stream');
const CaesarCipherStream = require('../cipher/CaesarCipherStream');
const ROT8CipherStream = require('../cipher/ROT8CipherStream');
const AtbashCipherStream = require('../cipher/AtbashCipherStream');
const { CHAR_CAESAR, CHAR_ROT8, CHAR_ATBASH, SHIFT_CAESAR, SHIFT_ROT8 } = require('../../const');
const CustomWriteStream = require('../customStreams/CustomWriteStream');
const CustomReadStream = require('../customStreams/CustomReadStream');

class Streams {
  constructor(config, inputFile, outputFile) {
    this.config = config;
    this.inputFile = inputFile;
    this.outputFile = outputFile;
    this.readStream =
      inputFile === null
        ? process.stdin
        : new CustomReadStream(this.inputFile, {
            encoding: 'utf8',
            highWaterMark: 10,
          });
    this.writeStream =
      outputFile === null ? process.stdout : new CustomWriteStream(this.outputFile);
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
    if (this.outputFile && fs.statSync(this.outputFile).size) {
      fs.appendFile(this.outputFile, '\n', () => {});
    }
    return new Promise((res, rej) => {
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
  }
}

module.exports = Streams;
