const fs = require('fs');
const { pipeline } = require('stream');
const errorHandler = require('./modules/customerError/errorHandler');
const validateOptionCLI = require('./modules/validate/validateOptionCLI');
const validateConfigCipher = require('./modules/validate/validateConfigCipher');
const parseCLI = require('./modules/parseCLI/parseCLI');
const CaesarCipherStream = require('./modules/cipher/CaesarCipherStream');
const ROT8CipherStream = require('./modules/cipher/ROT8CipherStream');
const AtbashCipherStream = require('./modules/cipher/AtbashCipherStream');
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
// node index.js -c "C1-R1-C0-C0-A-R0-R1-R1-A-C1" -i "./input.txt" -o "./output.txt"
