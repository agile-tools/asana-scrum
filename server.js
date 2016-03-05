const path = require('path');
const express = require('express');
const webpack = require('webpack');
const sassMiddleware = require('node-sass-middleware');
const bodyParser = require('body-parser');
const config = require('./config');

const app = express();
const environment = process.env.NODE_ENV || 'development';
const webPackConfig = (environment === 'production') ? require('./webpack.config.prod') : require('./webpack.config.dev');
const compiler = webpack(webPackConfig);

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

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
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
