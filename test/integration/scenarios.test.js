const { exec } = require('child_process');

// Test arguments CLI
describe('Arguments CLI. Running the cliApp and expecting a console output error', () => {
  test('should print to console error if user passes the same cli argument twice', (done) => {
    exec('node my_ciphering_cli -c "C1-C1-A-R0" -c', (error, stdout, stderr) => {
      expect(stderr).toBe('\nError: "-c" or "--config" option is duplicated \n');
      done();
    });
  });

  test("should print to console error if user does't pass -c or --config", (done) => {
    exec('node my_ciphering_cli', (error, stdout, stderr) => {
      expect(stderr).toBe(`\nError: Config can\'t to be empty.For example "C1-R0-A" \n`);
      done();
    });
  });

  const someFacePath = './same/face/path';
  test("should print to console error if user passes -i argument with path that doesn't exist or with no read access", (done) => {
    exec(`node my_ciphering_cli -c "C1-C1-A-R0" -i "${someFacePath}"`, (error, stdout, stderr) => {
      expect(stderr).toBe(`\nError: "${someFacePath}" file doesn't exist \n`);
      done();
    });
  });

  test("should print to console error if user passes -o argument with path that doesn't exist or with no read access", (done) => {
    exec(`node my_ciphering_cli -c "C1-C1-A-R0" -o "${someFacePath}"`, (error, stdout, stderr) => {
      expect(stderr).toBe(`\nError: "${someFacePath}" file doesn't exist \n`);
      done();
    });
  });
});

// Test config options
describe('Config options. Running the cliApp and expcting a console output error', () => {
  const configStr1 = 'C1-C1-A-R01';
  test('should print to console error if User passes more than two chars to item of config', (done) => {
    exec(`node my_ciphering_cli -c "${configStr1}"`, (error, stdout, stderr) => {
      expect(stderr).toBe(
        `\nError: Config "${configStr1}" isn't valid. Each item of config shouldn't has more than two chars. For example "C1-R0-A-C1" \n`
      );
      done();
    });
  });

  const configStr2 = 'C1-C1-A-R2';
  test('should print to console error if 0 or 1 should be after C or R in config', (done) => {
    exec(`node my_ciphering_cli -c "${configStr2}"`, (error, stdout, stderr) => {
      expect(stderr).toBe(
        `\nError: Config "${configStr2}" isn't valid. 0 or 1 should be after C or R in config. For example "C1-R0-A-C1" \n`
      );
      done();
    });
  });

  const configStr3 = 'C1-C1-A1-R1';
  test('should print to console error if there is number after A in config', (done) => {
    exec(`node my_ciphering_cli -c "${configStr3}"`, (error, stdout, stderr) => {
      expect(stderr).toBe(
        `\nError: Config "${configStr3}" isn't valid. After A shouldn't be number in config. For example "C1-R0-A-C1" \n`
      );
      done();
    });
  });
});
