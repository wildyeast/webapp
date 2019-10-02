const axios = require('axios');
const cookieparser = require('cookieparser');
const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');

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

      const instance = axios.create({
        baseURL,
        headers: {'Authorization': `Bearer ${process.env.FABMAN_TOKEN}`}
      });

      let payment = { iban: '', bank: '' }

      let profile = instance.get(`members/${fabmanId}`).then((r) => {
        return {
          firstName: r.data.firstName,
          lastName: r.data.lastName,
          memberNumber: r.data.memberNumber,
          emailAddress: r.data.emailAddress,
          address: r.data.address,
          address2: r.data.address2,
          city: r.data.city,
          zip: r.data.zip,
          lockVersion: r.data.lockVersion,
        }
      });
      let trainings = instance.get(`members/${fabmanId}/trainings`).then(r => r.data);
      let packages = instance.get(`members/${fabmanId}/packages`).then(r => r.data);

      Promise.all([profile, trainings, packages]).then(([profile, trainings, packages]) => {
        let user = { profile, trainings, packages, payment };

        callback(null, {
          statusCode: 200,
          body: JSON.stringify(user)
        });
      }).catch((err) => {
        console.log(err);
        callback(null, {
          statusCode: 500,
          body: 'ERROR'
        });
      });

    } else {
      console.log(err);
      callback(null, {
        statusCode: 500,
        body: 'ERROR'
      });
    }
  });
};
