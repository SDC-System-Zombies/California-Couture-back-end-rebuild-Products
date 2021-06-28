const express = require('express');
const morgan = require('morgan');
const router = require('./routes.js');
const expressStaticGzip = require('express-static-gzip');
const compression = require('compression')

const app = express();
const PORT = 3000 || process.env.PORT;

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', router);

app.use('/', compression());
app.use('/', expressStaticGzip('client/dist', {
  enableBrotli: true,
  customCompressions: [{
      encodingName: 'deflate',
      fileExtension: 'zz'
  }],
  orderPreference: ['br']
}));

app.listen(PORT, function() {
  console.log(`Server listening at http://localhost:${PORT}`);
});