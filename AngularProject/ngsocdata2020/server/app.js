const http = require('http');
// const https = require('https');
// const fs = require('fs');
const path = require('path');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const compression = require('compression');

const cacheTime = (60 * 60 * 1000);//1 hour
const environment = 'production'; //development, staging, production
const ipv4server = '0.0.0.0';

let distFolder = (environment === 'production' || environment === 'staging') ? 'dist' : 'dist';

// let options = null;

let port = 80;

// credentials for server auth

//  if (environment === 'production') {
//     port = 443;
//     options = {
//         ca: fs.readFileSync('../../certificates/fullbrain_org.ca-bundle'),
//         key: fs.readFileSync('../../certificates/private_key.key'),
//         cert: fs.readFileSync('../../certificates/fullbrain_org.crt')
//     };
// } else if (environment === 'staging') {
//     options = {
//         ca: fs.readFileSync('../../certificates/fullbrain_org.ca-bundle'),
//         key: fs.readFileSync('../../certificates/private_key.key'),
//         cert: fs.readFileSync('../../certificates/fullbrain_org.crt')
//     };
// } else {
//     options = {
//         key: fs.readFileSync('cert/key.pem'),
//         cert: fs.readFileSync('cert/cert.pem'),
//         passphrase: 'pass123'
//     };
// }

let indexPath = path.resolve(`../${distFolder}/ngsocdata2020/index.html`);

app.use(express.static(`../${distFolder}/ngsocdata2020/`, { maxAge: cacheTime.toString() }));

app.get('/', (req, res) => res.sendFile(indexPath));
app.use(compression());
app.use(bodyParser.json());
app.use(cors());
// require('./config/routes')(app);

app.get('*', (req, res) => res.sendFile(indexPath));

if (environment === 'production') {
    console.log(`Server listening on port 80`);
    http.createServer(app).listen(port, ipv4server)
    // https.createServer(options, app).listen(port, ipv4server);
}
console.log(`App running in ${environment} mode.`);
console.log(`App hosted from ${distFolder} folder.`);
console.log(`Server listening on port ${port}`);

// var httpRedirectApp = express () ,
// httpRedirectServer = http.createServer(httpRedirectApp);

// let httpPort = 80;

// httpRedirectApp.use((req, res, next) => {
//     if (!req.secure && environment === 'production') {
//         let url = `https://${req.headers.host}${req.url}`;
//         console.log(`Request loaded via http. Redirecting to ${url}`);
//         return res.redirect(url);
//     }
//     return next();
// });

// httpRedirectServer.listen(httpPort);
// console.log(`Redirect server listening on port ${httpPort}`);
