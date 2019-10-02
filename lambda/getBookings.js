const axios = require('axios');
const cookieparser = require('cookieparser');
const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');
const moment = require('moment');

const baseURL = 'https://fabman.io/api/v1/';

// TODO: a hell more of exception handling and general hardening
exports.handler = function(event, context, callback) {

  let token = null;
  if (event.headers.cookie) {
    const parsed = cookieparser.parse(event.headers.cookie)
    try {
      token = parsed.jwt
    } catch (err) {
      console.log(err);
      return callback(null, {
        statusCode: 401,
        body: 'Unauthorized'
      });
    }
  }

  if (!token) {
    return callback(null, {
      statusCode: 401,
      body: 'Unauthorized'
    });
  }

  var client = jwksClient({
    jwksUri: 'https://grandgarage.eu.auth0.com/.well-known/jwks.json'
  });
  function getKey(header, callback) {
    client.getSigningKey(header.kid, function(err, key) {
      let signingKey = key.publicKey || key.rsaPublicKey;
      callback(null, signingKey);
    });
  }

  jwt.verify(token, getKey, function(err, decoded) {
    if (!err) {
      let fabmanId = decoded['https://grandgarage.eu/fabmanId'];

      if (!event.queryStringParameters || !event.queryStringParameters.id) {
        callback(null, {
          statusCode: 500,
          body: 'Error: Invalid Param'
        });
      } else {
        let resourceId = event.queryStringParameters.id;

        const instance = axios.create({
          baseURL,
          headers: {'Authorization': `Bearer ${process.env.FABMAN_TOKEN}`}
        });

        let untilDate = new moment().add(7, 'days').format('YYYY-MM-DDTHH:mm');
        let fromDate = new moment().subtract(1, 'days').format('YYYY-MM-DDTHH:mm');
        let url = `bookings?resource=${resourceId}&fromDateTime=${fromDate}&untilDateTime=${untilDate}&state=confirmed&order=desc`;
        instance.get(url).then((r) => {
          callback(null, {
            statusCode: 200,
            body: JSON.stringify(r.data)
          });
        }).catch((err) => {
          console.log(err);
          callback(null, {
            statusCode: 500,
            body: 'ERROR'
          });
        });
      }

    } else {
      console.log(err);
      callback(null, {
        statusCode: 500,
        body: 'ERROR'
      });
    }
  });
};
