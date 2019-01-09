const axios = require('axios');
const baseURL = 'https://fabman.io/api/v1/';

exports.handler = function(event, context, callback) {
  const instance = axios.create({
    baseURL,
    headers: {'Authorization': `Bearer ${process.env.FABMAN_TOKEN}`}
  });

  instance.get('members', newMember).then((r) => {
    console.log(r);
  }).catch((e) => {
    console.log('ERROR', e);
  });

  callback(null, {
    statusCode: 200,
    body: '{ success: "true" }'
  });
};
