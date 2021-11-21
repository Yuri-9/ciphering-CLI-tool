const { isUpperCase, getPositiveShift } = require('../../../src/modules/cipher/utilsCipher');

const { ENGLISH_ALFABIT } = require('../../../src/const');

describe('Function isUpperCase', () => {
  test('should return true, if char is uppercase', () => {
    expect(isUpperCase('H')).toBe(true);
  });
  test('should return false, if char is lowercase', () => {
    expect(isUpperCase('h')).toBe(false);
  });

  test('should return false, if char is lowercase', () => {
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
