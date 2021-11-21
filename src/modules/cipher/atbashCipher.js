const { ENGLISH_ALFABIT } = require('../../const');
const { isUpperCase } = require('./utilsCipher');

const atbashCipher = (text) => {
  const textCipher = text.split('').map((letter) => {
    const index = ENGLISH_ALFABIT.findIndex((item) => item === letter.toLowerCase());
    if (index === -1) {
      return letter;
    }
    const newLetter = ENGLISH_ALFABIT[ENGLISH_ALFABIT.length - 1 - index];
    return isUpperCase(letter) ? newLetter.toUpperCase() : newLetter;
  });
  return textCipher.join('');
};

module.exports = atbashCipher;
