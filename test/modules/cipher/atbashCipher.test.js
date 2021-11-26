const atbashCipher = require('../../../src/modules/cipher/atbashCipher');

describe('Function atbashCipher', () => {
  const string = 'abcd e!';
  const shipheedString = 'zyxw v!';

  test('should encrypt the string correctly', () => {
    expect(atbashCipher(string)).toBe(shipheedString);
  });
  test('should encrypt the string correctly to uppercase', () => {
    expect(atbashCipher('HHH')).toBe('SSS');
  });
});
