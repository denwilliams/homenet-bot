const BASE_URL = 'http://homenet-core.local:3210/api/v1/';
const got = require('got');

module.exports = (method, path, key, data) => {
  return got(BASE_URL + path + key, {
    method: method,
    json: true,
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(data)
  })
  .then(res => console.log('SUCCESS', res.body))
  .catch(err => console.error(err));
};
