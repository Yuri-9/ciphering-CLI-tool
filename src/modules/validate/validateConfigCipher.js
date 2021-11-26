const CustomerError = require('../customerError/customerError');
const { CHAR_CAESAR, CHAR_ROT8, CHAR_ATBASH, CHARS } = require('../../const');

const isValidFirstChar = (configArr, charsCiphers) =>
  configArr.every((item) => charsCiphers.includes(item[0]));

const hasEveryItemNotMoreTwoChar = (configArr) => configArr.every((item) => item.length <= 2);

const isShiftOneOrZero = (configArr, charCipher) => {
  return configArr
    .filter((item) => item[0] === charCipher)
    .every((item) => +item[1] === 0 || +item[1] === 1);
};

const hasCipherShift = (configArr, charCipher) => {
  return !configArr.filter((item) => item[0] === charCipher).every((item) => item.length === 1);
};

const validateConfigCipher = (configStr) =>
  new Promise((res, rej) => {
    if (!configStr) {
      rej(new CustomerError('Config can\'t to be empty.For example "C1-R0-A"'));
    }

    const configArr = configStr.split('-');
    if (!isValidFirstChar(configArr, CHARS)) {
      rej(
        new CustomerError(
          `Config "${configStr}" isn't valid. First letter of each item config should be С, R, A. For example "C1-R0-A-C1"`
        )
      );
    }
    if (!hasEveryItemNotMoreTwoChar(configArr)) {
      rej(
        new CustomerError(
          `Config "${configStr}" isn't valid. Each item of config shouldn't has more than two chars. For example "C1-R0-A-C1"`
        )
      );
    }
    if (!isShiftOneOrZero(configArr, CHAR_CAESAR)) {
      rej(
        new CustomerError(
          `Config "${configStr}" isn't valid. 0 or 1 should be after C or R in config. For example "C1-R0-A-C1"`
        )
      );
    }

    if (!isShiftOneOrZero(configArr, CHAR_ROT8)) {
      rej(
        new CustomerError(
          `Config "${configStr}" isn't valid. 0 or 1 should be after C or R in config. For example "C1-R0-A-C1"`
        )
      );
    }

    if (hasCipherShift(configArr, CHAR_ATBASH)) {
      rej(
        new CustomerError(
          `Config "${configStr}" isn't valid. After A shouldn't be number in config. For example "C1-R0-A-C1"`
        )
      );
    }
    res();
  });

module.exports = validateConfigCipher;
