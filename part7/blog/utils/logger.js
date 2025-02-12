const info = (...params) => {
  console.log(...params);
};

const error = (...params) => {
  console.log("#####################################");
  console.log("BELOW IS THE ERROR BE CAREFUL");
  console.log(...params);
  console.log("ABOVE IS THE ERROR PLEASE READ IT");
  console.log("#####################################");
};

module.exports = {
  info,
  error,
};
