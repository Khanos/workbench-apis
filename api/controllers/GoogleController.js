const path = require('path');
const env = require(`${path.resolve()}/config/env.json`);

module.exports = {
  maps: (req, res) => {
    console.log('hello from maps');
    return res.render('google/maps.ejs', {mapsApiKey: env.google.maps_api_key});
  },
}