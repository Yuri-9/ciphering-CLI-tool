const errorHandler = require('./modules/customerError/errorHandler');
const { validateOptionCLI } = require('./modules/validate/validateOptionCLI');
const { validateConfigCipher } = require('./modules/validate/validateConfigCipher');
const parseCLI = require('./modules/parseCLI/parseCLI');
const Streams = require('./modules/Streams/Streams');
const isFileExists = require('./modules/validate/isFileExists');

const appArgs = process.argv.slice(2);

const app = async () => {
  try {
    await validateOptionCLI(appArgs);
    const { config, input, output } = parseCLI(appArgs);

    if (input !== null) {
      await isFileExists(input);
    }
    if (output !== null) {
      await isFileExists(output);
    }

    await validateConfigCipher(config);

    const streams = new Streams(config, input, output);
    await streams.runPipeline();
  } catch (error) {
    errorHandler(error);
  }
};

module.exports = app;
