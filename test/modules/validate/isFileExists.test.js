const fs = require('fs');
const isFileExists = require('../../../src/modules/validate/isFileExists');

jest.spyOn(fs, 'existsSync');

describe('Function isFileExists', () => {
  test('should expect if file exist', async () => {
    fs.existsSync.mockImplementation(() => true);
    const result = await isFileExists('./some/fake/path');
    expect(result).toEqual('./some/fake/path');
    expect(result).not.toEqual('./some');
    expect(fs.existsSync.mock.calls[0][0]).toEqual('./some/fake/path');
  });
});
