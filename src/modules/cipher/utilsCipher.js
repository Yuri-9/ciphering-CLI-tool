const { ENGLISH_ALFABIT } = require('../../const');

const isUpperCase = (letter) => {
  return letter === letter.toUpperCase();
};

const getPositiveShift = (shift) => {
  return (shift % ENGLISH_ALFABIT.length) + ENGLISH_ALFABIT.length;
};

module.exports = { isUpperCase, getPositiveShift };
