const path = require('path');
const express = require('express');
const webpack = require('webpack');
const sassMiddleware = require('node-sass-middleware');
const bodyParser = require('body-parser');
const url = require('url');

const config = require('./config');
const Asana = require('asana');

const app = express();
const environment = process.env.NODE_ENV || 'development';
const webPackConfig = (environment === 'production') ? require('./webpack.config.prod') : require('./webpack.config.dev');
const compiler = webpack(webPackConfig);

function createClient() {
  return Asana.Client.create({
    clientId: config.asana.oAuth.client_id,
    redirectUri: config.asana.oAuth.redirect_uri,
    clientSecret: config.asana.oAuth.client_secret
  });
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: webPackConfig.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

if (environment === 'development') {
  app.use(sassMiddleware({
    src: path.join(__dirname, 'sass'),
    dest: path.join(__dirname, 'public'),
    // debug: true,
    force: false,
    outputStyle: 'compressed',
    prefix: '/public'
  }));
}

app.use(express.static(path.join(__dirname, 'public')));
app.use('/public', express.static(__dirname + '/public'));
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist/'));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.get('/oAuth/callback', (req, res) => {
  const urlParts = url.parse(req.url, true);
  const code = urlParts.query.code;
  if (code) {
    const client = createClient();
    client.app.accessTokenFromCode(code).then((credentials) => {
      res.cookie('token', credentials.access_token, { maxAge: 60 * 60 * 1000 });
      res.redirect('/');
    });
  } else {
    res.send('Error on authorization: ' + urlParts.query.error);
  }
});


const host = (environment === 'production') ? config.prod.host : config.dev.host;
const port = (environment === 'production') ? config.prod.port : config.dev.port;

app.listen(port, host, (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log('Listening at http://' + host + ':' + port);
});
