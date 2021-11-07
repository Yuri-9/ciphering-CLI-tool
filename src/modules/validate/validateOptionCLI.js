const CustomerError = require('../customerError/customerError');
const { OPTIONS } = require('../../const');

const isOptionDuplicated = (args, optionAlias) => {
  let numberAlias = 0;
  for (let i = 0; i < args.length; i++) {
    if (optionAlias.includes(args[i])) {
      numberAlias++;
    }
  }
  if (numberAlias <= 1) return true;
  return false;
};

const validateOptionCLI = (appArgs) =>
  new Promise((res, rej) => {
    OPTIONS.forEach((option) => {
      if (!isOptionDuplicated(appArgs, option)) {
        rej(new CustomerError(`Some option is duplicated`));
      }
    });
    res();
  });

module.exports = validateOptionCLI;
