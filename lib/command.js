const apiRequest = require('./api-request');

module.exports = (key, command) => {
  return apiRequest('POST', 'commands/', key + '/' + command, null);
};
