const {
  isUpperCase,
  getPositiveShift,
  getCipheredChar,
  caesarCipher,
} = require('../../../src/modules/cipher/caesarCipher');
const { ENGLISH_ALFABIT } = require('../../../src/const');

describe('Function Caesar cipher', () => {
  test('Function isUpperCase() should return true, if char is uppercase', () => {
    expect(isUpperCase('H')).toBe(true);
  });
  test('Function isUpperCase() should return false, if char is lowercase', () => {
    expect(isUpperCase('h')).toBe(false);
  });

  test('Function isUpperCase() should return false, if char is lowercase', () => {
    expect(isUpperCase('h')).toBe(false);
  });
});

describe('Function getPositiveShift', () => {
  test('should be return positive shift greater than 0', () => {
    expect(getPositiveShift(-1)).toBeGreaterThan(0);
  });

  const doubleLengthAlfabit = ENGLISH_ALFABIT.length * 2;
  test(`should be return positive shift less than ${doubleLengthAlfabit}`, () => {
    expect(getPositiveShift(1000)).toBeLessThanOrEqual(doubleLengthAlfabit);
  });
});

describe('Function getCipheredChar', () => {
  const index = 5;
  const positiveShift = 70;
  test('should be return typeof of string', () => {
    expect(typeof getCipheredChar(index, positiveShift) === 'string').toBeTruthy();
  });
  test('should be return char match one letter of lower English alfabit ', () => {
    expect(getCipheredChar(index, positiveShift).match(/[a-z]/g).length === 1).toBeTruthy();
  });
});

describe('Function caesarCipher', () => {
  const string = 'abcd e!';
  const shipheedString = 'ijkl m!';
  const shift = 8;
  test('should encrypt the string correctly', () => {
    expect(caesarCipher(string, shift)).toBe(shipheedString);
  });
});
