const { ENGLISH_ALFABIT } = require('../../const');

const isUpperCase = (letter) => {
  return letter === letter.toUpperCase();
};

const getPositiveShift = (shift) => {
  return (shift % ENGLISH_ALFABIT.length) + ENGLISH_ALFABIT.length;
};

const getCipheredChar = (index, shift) => {
  return ENGLISH_ALFABIT[(index + getPositiveShift(shift)) % ENGLISH_ALFABIT.length];
};

const caesarCipher = (chunk, shift = 0) => {
  const cipheredChunk = chunk.split('').map((letter) => {
    const index = ENGLISH_ALFABIT.findIndex((item) => item === letter.toLowerCase());
    if (index === -1) {
      return letter;
    }
    const cipheredChar = getCipheredChar(index, shift);
    return isUpperCase(letter) ? cipheredChar.toUpperCase() : cipheredChar;
  });
  return cipheredChunk.join('');
};

module.exports = { isUpperCase, getPositiveShift, getCipheredChar, caesarCipher };
