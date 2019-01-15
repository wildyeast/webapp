const axios = require('axios');

const baseURL = 'https://fabman.io/api/v1/';

exports.handler = function(event, context, callback) {
  const instance = axios.create({
    baseURL,
    headers: {'Authorization': `Bearer ${process.env.FABMAN_TOKEN}`}
  });

  console.log(process.env.FABMAN_TOKEN);

  return instance.get('packages').then((r) => {
    callback(null, {
      statusCode: 200,
      body: JSON.stringify(r.data)
    });
  }).catch((e) => {
    console.log(e);
    callback(null, {
      statusCode: 500,
      body: 'ERROR'
    });
  });
};
