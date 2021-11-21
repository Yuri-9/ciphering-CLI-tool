const {
  isValidFirstChar,
  hasEveryItemNotMoreTwoChar,
  isShiftOneOrZero,
  hasCipherShift,
  validateConfigCipher,
} = require('../../../src/modules/validate/validateConfigCipher');
const { CHAR_CAESAR, CHAR_ROT8, CHAR_ATBASH, CHARS } = require('../../../src/const');
const CustomerError = require('../../../src/modules/customerError/customerError');

describe('Function isValidFirstChar', () => {
  test('should return true, if first char of item config is A, R or C', () => {
    expect(isValidFirstChar(['A1', 'R0', 'C1'], CHARS)).toBe(true);
  });
});

describe('Function hasEveryItemNotMoreTwoChar', () => {
  test('should return true, if each item of config has not more two char', () => {
    expect(hasEveryItemNotMoreTwoChar(['A1', 'R0', 'C1'])).toBe(true);
  });
  test('should return true, if each item of config has not more two char', () => {
    expect(hasEveryItemNotMoreTwoChar(['A1', 'R0', 'C12'])).toBe(false);
  });
});

describe('Function isShiftOneOrZero', () => {
  test('should return true, if there is a number (0 or 1) after the letter', () => {
    expect(isShiftOneOrZero(['A1', 'R0', 'C1', 'C0'], CHAR_CAESAR)).toBe(true);
  });
  test('should return true, if there is a number (0 or 1) after the letter', () => {
    expect(isShiftOneOrZero(['A1', 'R0', 'C1', 'C0'], CHAR_ROT8)).toBe(true);
  });
  test('should return true, if there is a number (0 or 1) after the letter', () => {
    expect(isShiftOneOrZero(['A1', 'C2'], CHAR_CAESAR)).toBe(false);
  });
});

describe('Function hasCipherShift', () => {
  test("should return true, if item of config hasn't shift", () => {
    expect(hasCipherShift(['A', 'R0', 'C1'], CHAR_ATBASH)).toBe(false);
  });
});

describe('Function validateConfigCipher', () => {
  test('should return error, if config is empty', () => {
    validateConfigCipher().catch((e) =>
      expect(e).toEqual(new CustomerError('Config can\'t to be empty.For example "C1-R0-A"'))
    );
  });

  const configStr0 = 'V1-C1-A-R01';
  test("should return error, if first letter of each item config isn't С, R, A", () => {
    validateConfigCipher(configStr0).catch((e) =>
      expect(e).toEqual(
        new CustomerError(
          `Config "${configStr0}" isn't valid. First letter of each item config should be С, R, A. For example "C1-R0-A-C1"`
        )
      )
    );
  });

  const configStr1 = 'C1-C1-A-R01';
  test('should return error, if item of config has more than two chars', () => {
    validateConfigCipher(configStr1).catch((e) =>
      expect(e).toEqual(
        new CustomerError(
          `Config "${configStr1}" isn't valid. Each item of config shouldn't has more than two chars. For example "C1-R0-A-C1"`
        )
      )
    );
  });

  const configStr2 = 'C1-C1-A-R2';
  test("should return error, if item of config C or R hasn't 0 or 1", () => {
    validateConfigCipher(configStr2).catch((e) => {
      console.log(e);
      expect(e).toEqual(
        new CustomerError(
          `Config "${configStr2}" isn't valid. 0 or 1 should be after C or R in config. For example "C1-R0-A-C1"`
        )
      );
    });
  });

  const configStr21 = 'C1-C2-A-R1';
  test("should return error, if item of config C or R hasn't 0 or 1", () => {
    validateConfigCipher(configStr21).catch((e) => {
      expect(e).toEqual(
        new CustomerError(
          `Config "${configStr21}" isn't valid. 0 or 1 should be after C or R in config. For example "C1-R0-A-C1"`
        )
      );
    });
  });

  const configStr3 = 'C1-C1-A1-R1';
  test("should return error, if there isn't number after A in config", () => {
    validateConfigCipher(configStr3).catch((e) =>
      expect(e).toEqual(
        new CustomerError(
          `Config "${configStr3}" isn't valid. After A shouldn't be number in config. For example "C1-R0-A-C1"`
        )
      )
    );
  });
});
