const { OPTIONS } = require('../../const');

const isItemOptionIsNameOptions = (itemOption, options) => {
  return options.some((option) => option.includes(itemOption));
};

const parseCLI = (appArgs) => {
  const optionObj = {};
  // create object this all options null
  OPTIONS.forEach((option) => {
    optionObj[option[1].slice(2)] = null;
  });

  OPTIONS.forEach((option) => {
    const indexOption = appArgs.findIndex((item) => option.includes(item));
    const itemOption = appArgs[indexOption + 1];
    if (!isItemOptionIsNameOptions(itemOption, OPTIONS)) {
      optionObj[option[1].slice(2)] = itemOption;
    }
  });
  return optionObj;
};

module.exports = parseCLI;
