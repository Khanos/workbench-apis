require('dotenv').config();
const express = require('express');
const https = require('https');
const fs = require('fs');
const path = require('path');
const favicon = require('serve-favicon');
const routesIndex = require('./api/routes');
const port = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost';
const env = require(`${path.resolve()}/config/env.json`);
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(favicon(__dirname + '/public/img/favicon.ico'));
app.use(express.static('./public'));
// Routes
app.use('/api', routesIndex);
// Error handling
app.use((error, req, res, next) => {
    let response = {
      status: error.status || 500,
      message: `Ups, something bad happened: ${error.message}` || 'Ups, something bad happened: Internal Server Error',
      error: error
    };
    return res.render('error.ejs', response);
});
// Main view
app.get('/', (req, res) => {
    return res.render('index.ejs');
});
let server = https.createServer({
    key: fs.readFileSync(env.ssl.key),
    cert: fs.readFileSync(env.ssl.cert),
    passphrase: env.ssl.passphrase
}, app)
.listen(port, () => {
    console.log('The app is running...');
    console.log(`https://${host}:${port}`);
});
module.exports = server;