const errorHandler = (err) => {
  const { isCustom } = err;
  if (isCustom) {
    console.log('Error: ', err.message);
  } else {
    throw err;
  }
};

module.exports = errorHandler;
