const { isItemOptionIsNameOptions, parseCLI } = require('../../../src/modules/parseCLI/parseCLI');
const { OPTIONS } = require('../../../src/const');

describe('Function isItemOptionIsNameOptions', () => {
  test('should return true, if -c is name of option', () => {
    expect(isItemOptionIsNameOptions('-c', OPTIONS)).toBe(true);
  });

  test('should return true, if --config is name of option', () => {
    expect(isItemOptionIsNameOptions('--config', OPTIONS)).toBe(true);
  });

  test('should return true, if abcdifg is name of option', () => {
    expect(isItemOptionIsNameOptions('abcdifg', OPTIONS)).toBe(false);
  });
});

describe('Function parseCLI', () => {
  const optionObj = {
    config: 'C1-C0-A-R1-R0-A-R0-R0-C1-A',
    input: './input.txt',
    output: './output.txt',
  };

  const optionObj2 = {
    config: 'C1-C0',
    input: null,
    output: null,
  };

  const appArgs = [
    '-c',
    'C1-C0-A-R1-R0-A-R0-R0-C1-A',
    '-i',
    './input.txt',
    '-o',
    './output.txt',
    'fake',
  ];

  test('should return correct object of options', () => {
    expect(parseCLI(appArgs)).toEqual(optionObj);
  });

  test('should return true, if -c is name of option', () => {
    expect(parseCLI(['-c', 'C1-C0', 'asd'])).toEqual(optionObj2);
  });
});
