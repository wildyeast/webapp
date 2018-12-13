const axios = require('axios');
const baseURL = 'https://fabman.io/api/v1/';

exports.handler = function(event, context, callback) {
  let newMember = {
    "account": 310,
    "space": 290,
    "firstName": "Maria",
    "lastName": "Musterfrau",
    "gender": "female",
    "dateOfBirth": "2018-12-11",
    "emailAddress": "test@doebi.at",
    "company": "string",
    "phone": "string",
    "address": "string",
    "address2": "string",
    "city": "string",
    "zip": "string",
    "countryCode": "AT",
    "region": "string",
    "notes": "string",
    "createdAt": "2018-12-11"
  };

  const instance = axios.create({
    baseURL,
    headers: {'Authorization': `Bearer ${process.env.FABMAN_TOKEN}`}
  });

  instance.post('members', newMember).then((r) => {
    console.log(r);
  }).catch((e) => {
    console.log('ERROR', e);
  });

  callback(null, {
    statusCode: 200,
    body: '{ success: "true" }'
  });
};
