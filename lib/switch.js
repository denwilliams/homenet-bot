const apiRequest = require('./api-request');

module.exports = (key, value) => {
  return apiRequest('PUT', 'switches/', key, { value });
};
