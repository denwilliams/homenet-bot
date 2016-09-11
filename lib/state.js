const apiRequest = require('./api-request');

module.exports = (key, state) => {
  return apiRequest('PUT', 'states/', key, { state });
};
