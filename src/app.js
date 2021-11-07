const errorHandler = require('./modules/customerError/errorHandler');
const validateOptionCLI = require('./modules/validate/validateOptionCLI');
const validateConfigCipher = require('./modules/validate/validateConfigCipher');
const parseCLI = require('./modules/parseCLI/parseCLI');

const appArgs = process.argv.slice(2);

// const config = 'C1-R1-A';

const app = async () => {
  try {
    await validateOptionCLI(appArgs);
    const { config, input, output } = parseCLI(appArgs);
    console.log(config, input, output);
    await validateConfigCipher(config);
  } catch (error) {
    errorHandler(error);
  }
};

module.exports = app;
