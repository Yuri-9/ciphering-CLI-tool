const { ENGLISH_ALFABIT } = require('../../const');

const caesarCipher = (text, shift = 0) => {
  const currentShift = (shift % ENGLISH_ALFABIT.length) + ENGLISH_ALFABIT.length;
  const textCipher = text.split('').map((letter) => {
    const index = ENGLISH_ALFABIT.findIndex((item) => item === letter.toLowerCase());
    if (index === -1) {
      return letter;
    }
    const newLetter = ENGLISH_ALFABIT[(index + currentShift) % ENGLISH_ALFABIT.length];
    const isUpperCase = letter === letter.toUpperCase();
    // console.log(newLetter);
    return isUpperCase ? newLetter.toUpperCase() : newLetter;
  });
  return textCipher.join('');
};

module.exports = caesarCipher;
