const fs = require('fs');
const errorHandler = require('./modules/customerError/errorHandler');
const validateOptionCLI = require('./modules/validate/validateOptionCLI');
const validateConfigCipher = require('./modules/validate/validateConfigCipher');
const parseCLI = require('./modules/parseCLI/parseCLI');
const caesarCipher = require('./modules/cipher/caesarCipher');
const CipherStream = require('./modules/cipher/CipherStream');

const appArgs = process.argv.slice(2);

// const config = 'C1-R1-A';

const app = async () => {
  try {
    await validateOptionCLI(appArgs);
    const { config, input, output } = parseCLI(appArgs);
    console.log(config, input, output);
    await validateConfigCipher(config);
    fs.createReadStream('./src/input.txt', { encoding: 'utf8', highWaterMark: 10 })
      .pipe(new CipherStream({ highWaterMark: 10 }, caesarCipher, -1))
      .pipe(new CipherStream({ highWaterMark: 10 }, caesarCipher, 1))
      // .pipe(new CipherStream({ highWaterMark: 10 }, caesarCipher, 1))
      .pipe(fs.createWriteStream('./src/output.txt', { encoding: 'utf8' }));
  } catch (error) {
    errorHandler(error);
  }
};

module.exports = app;

// node index.js -c "C1-R1-A" -i "./input.txt" -o "./output.txt"
