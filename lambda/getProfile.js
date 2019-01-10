const axios = require('axios');
const cookieparser = require('cookieparser');
const jwt = require('jsonwebtoken');

const baseURL = 'https://fabman.io/api/v1/';

exports.handler = function(event, context, callback) {

  let auth = null
  if (event.headers.cookie) {
    const parsed = cookieparser.parse(event.headers.cookie)
    try {
      auth = JSON.parse(parsed.auth)
    } catch (err) {
      // No valid cookie found
    }
  }

  if (!auth) {
    return cb(null, {
      statusCode: 401,
      body: 'Unauthorized'
    });
  }

  let decoded = jwt.verify(auth.accessToken, process.env.AUTH0_CLIENT_SECRET);
  console.log(decoded);

  const instance = axios.create({
    baseURL,
    headers: {'Authorization': `Bearer ${process.env.FABMAN_TOKEN}`}
  });

  instance.get('members').then((r) => {
    callback(null, {
      statusCode: 200,
      body: JSON.stringify(r)
    });
  }).catch((e) => {
    console.log('ERROR', e);
  });

};
