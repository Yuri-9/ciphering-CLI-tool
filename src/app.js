const errorHandler = require('./modules/customerError/errorHandler');
const validateOptionCLI = require('./modules/validate/validateOptionCLI');
const validateConfigCipher = require('./modules/validate/validateConfigCipher');

const appArgs = process.argv.slice(2);

const config = 'C1-R1-A';

const app = async () => {
  try {
    await validateOptionCLI(appArgs);
    await validateConfigCipher(config);
    console.log('Ok');
  } catch (error) {
    errorHandler(error);
  }
};

console.log(appArgs);

module.exports = app;
