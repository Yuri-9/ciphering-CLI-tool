const validateConfigCipher = require('./modules/validateConfigCipher');
const errorHandler = require('./modules/customerError/errorHandler');

const config = 'C1-R1-A';

// const myArgs = process.argv.slice(2);

const app = async () => {
  try {
    await validateConfigCipher(config);
    console.log('Ok');
  } catch (error) {
    errorHandler(error);
  }
};

module.exports = app;
