const errorHandler = (err) => {
  const { isCustom } = err;
  if (isCustom) {
    process.stderr.write(`Error: ${err.message} \n`);
    process.exit(2);
  } else {
    throw err;
  }
};

module.exports = errorHandler;
