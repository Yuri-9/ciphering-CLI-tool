const fs = require('fs');
const { pipeline } = require('stream');
const errorHandler = require('./modules/customerError/errorHandler');
const validateOptionCLI = require('./modules/validate/validateOptionCLI');
const validateConfigCipher = require('./modules/validate/validateConfigCipher');
const parseCLI = require('./modules/parseCLI/parseCLI');
const caesarCipher = require('./modules/cipher/caesarCipher');
const atbashCipher = require('./modules/cipher/atbashCipher');
const CipherStream = require('./modules/cipher/CipherStream');
const { CHAR_CAESAR, CHAR_ROT8, CHAR_ATBASH, SHIFT_CAESAR, SHIFT_ROT8 } = require('./const');

const appArgs = process.argv.slice(2);

// const config = 'C1-R1-A';

const app = async () => {
  try {
    await validateOptionCLI(appArgs);
    const { config, input, output } = parseCLI(appArgs);
    console.log(config, input, output);
    await validateConfigCipher(config);

    const transformStreams = config.split('-').map((item) => {
      switch (item[0]) {
        case CHAR_CAESAR: {
          const shift = +item[1] ? SHIFT_CAESAR : -SHIFT_CAESAR;
          return new CipherStream({ highWaterMark: 10 }, caesarCipher, shift);
        }
        case CHAR_ROT8: {
          const shift = +item[1] ? SHIFT_ROT8 : -SHIFT_ROT8;
          return new CipherStream({ highWaterMark: 10 }, caesarCipher, shift);
        }
        case CHAR_ATBASH: {
          return new CipherStream({ highWaterMark: 10 }, atbashCipher);
        }
        default: {
          return new CipherStream({ highWaterMark: 10 }, caesarCipher, 0);
        }
      }
    });

    const steams = [
      fs.createReadStream('./src/input.txt', { encoding: 'utf8', highWaterMark: 10 }),
      ...transformStreams,
      fs.createWriteStream('./src/output.txt', { encoding: 'utf8' }),
    ];

    pipeline(steams, () => {});
  } catch (error) {
    errorHandler(error);
  }
};

module.exports = app;

// node index.js -c "C1-R1-A" -i "./input.txt" -o "./output.txt"
