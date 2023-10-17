const express = require('express');
const app = express();

const helmet = require("helmet@3.21.3"); // Updated helmet version

const ninetyDaysInSeconds = 90 * 24 * 60 * 60;

app.use(
  helmet({
    hidePoweredBy: true,
    frameguard: { action: 'deny' },
    xssFilter: true,
    noSniff: true,
    ieNoOpen: true,
    hsts: { maxAge: ninetyDaysInSeconds, force: true },
    dnsPrefetchControl: true,
    noCache: true,
    contentSecurityPolicy: { directives: { defaultSrc: ["'self'"], scriptSrc: ["'self'", "trusted-cdn.com"] }},
  })
);

app.use(helmet({
  frameguard: {
    action: 'deny'
  },
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ['style.com'],
    }
  },
  dnsPrefetchControl: false
}));

module.exports = app;
const api = require('./server.js');
app.use(express.static('public'));
app.disable('strict-transport-security');
app.use('/_api', api);
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});
let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Your app is listening on port ${port}`);
});
