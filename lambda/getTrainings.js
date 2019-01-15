const axios = require('axios');
const cookieparser = require('cookieparser');
const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');

const baseURL = 'https://fabman.io/api/v1/';

exports.handler = function(event, context, callback) {
  let fabmanId = decoded['https://grandgarage.eu/fabmanId'];

  const instance = axios.create({
    baseURL,
    headers: {'Authorization': `Bearer ${process.env.FABMAN_TOKEN}`}
  });

  instance.get('trainings').then((r) => {
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
