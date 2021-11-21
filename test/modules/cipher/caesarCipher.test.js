const { getCipheredChar, caesarCipher } = require('../../../src/modules/cipher/caesarCipher');

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
  test('should encrypt the string correctly to uppercase', () => {
    expect(caesarCipher('HHH', shift)).toBe('PPP');
  });
  test('should return the same string', () => {
    expect(caesarCipher('HHH')).toBe('HHH');
  });
});
