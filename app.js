const express = require('express');
const https = require('https');
const fs = require('fs');
const path = require('path');
const favicon = require('serve-favicon');
const routesIndex = require('./api/routes');
const env = require(`${path.resolve()}/config/env.json`);
const app = express();

// Configs
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(favicon(__dirname + '/public/img/favicon.ico'));
app.use(express.static('./public'));
// Routes
app.use('/api', routesIndex);
// Error handling
app.use((error, req, res, next) => {
    if(error){
        let response = {
            status: error.status || 500,
            message: `Ups, something bad happened: ${error.message}` || 'Ups, something bad happened: Internal Server Error',
            error: error
        };
        return res.render('error.ejs', response);
    } else {
        next();
    }
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
.listen(env.port, env.host, () => {
    console.log('The app is running...');
    console.log(`https://${env.host}:${env.port}`);
});
module.exports = server;