const axios = require('axios');

const baseURL = 'https://fabman.io/api/v1/';

exports.handler = function(event, context, callback) {

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

    let resource = instance.get(`resources/${resourceId}`).then((r) => {
      return {
        id: r.data.id,
        name: r.data.name,
        type: r.data.type,
        state: r.data.state,
        maintenanceNotes: r.data.maintenanceNotes
      }
      /*
            displayTitle: r.displayTitle,
            safetyMessage: r.safetyMessage,
            */
    });
    let bridge = instance.get(`resources/${resourceId}/bridge`).then((r) => {
      return {
        inUse: r.data.inUse,
        offline: r.data.offline,
      }
    });

    Promise.all([resource, bridge]).then(([resource, bridge]) => {
      let data = { ...resource, ...bridge };
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(data)
      });
    }).catch((err) => {
      console.log(err);
      callback(null, {
        statusCode: 500,
        body: 'ERROR'
      });
    });
  }
};
