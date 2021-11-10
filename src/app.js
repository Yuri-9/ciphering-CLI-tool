const errorHandler = require('./modules/customerError/errorHandler');
const validateOptionCLI = require('./modules/validate/validateOptionCLI');
const validateConfigCipher = require('./modules/validate/validateConfigCipher');
const parseCLI = require('./modules/parseCLI/parseCLI');
const Streams = require('./modules/Streams/Streams');
const isFileExists = require('./modules/validate/isFileExists');

const appArgs = process.argv.slice(2);
const app = async () => {
  try {
    await validateOptionCLI(appArgs);
    const { config, input, output } = parseCLI(appArgs);
    console.log(config, input, output);
    if (input !== null) {
      await isFileExists(input);
    }
    await isFileExists(output);

    await validateConfigCipher(config);

    const streams = new Streams(config, input, output);
    streams.runPipeline();
  } catch (error) {
    errorHandler(error);
  }
};

module.exports = app;

// node index.js -c "C1-R1-A" -i "./input.txt" -o "./output.txt"
// node index.js -c "C1-R1-C0-C0-A-R0-R1-R1-A-C1" -i "./input.txt" -o "./output.txt"
