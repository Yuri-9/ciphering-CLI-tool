const { exec } = require('child_process');

describe('running the cli with expecting a console output error', () => {
  test('should print to console error if user passes the same cli argument twice', (done) => {
    exec('node my_ciphering_cli -c C1-C1-A-R0 -c', (error, stdout, stderr) => {
      expect(stderr).toBe('\nError: "-c" or "--config" option is duplicated \n');
      done();
    });
  });
});
