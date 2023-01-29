const path = require('path');
const http = require('http');
const morgan = require('morgan');
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const operations = require('./controllers/Default.js');
const OpenApiValidator = require('express-openapi-validator');
const { initialize } = require('express-openapi');

const serverPort = 3333;

// check running environment
//const mode = process.env.EBM_MODE || 'development';
const mode = process.env.EBM_MODE || 'production';

//TODO: const oasDefinition = path.join(__dirname, 'api/openapi.yaml');
const apiSpec = path.join(__dirname, '../openapi/ebmgr.yaml');
const app = express();
app.use(morgan('combined'));

// app.use(
//   OpenApiValidator.middleware({
//     apiSpec,
//     validateRequests: true,
//     validateResponses: true,
//   }),
// );

initialize({
  app,
  apiDoc: apiSpec,
  operations,
  logger: console,
  errorMiddleware: (err, req, res, _next) => {
    console.log(`error: ${err}`);
    _next();
  },
});

/*

  const routes = {
  get: {
    books: operations.getBooks,
    'books/:vpath': operations.getBook,
    'books/:vpath/thumbnail': operations.getBookThumbnail,
  },
  put: {
    'books/:vpath/star': operations.setStar,
  }
};

const apiRoot = '/api/v1/';
console.log(operations);
for (const p in routes.get) {
  console.log(`add GET ${apiRoot + p}`);
  app.get(apiRoot + p, routes.get[p]);
}

for (const p in routes.put) {
  app.put(apiRoot + p, routes.put[p]);
}
*/

if (mode == 'development') {
  // add routes for React
  app.use(/^\/(?!(docs|api)).*/,
          createProxyMiddleware({
            target: 'http://localhost:3000',
            changeOrigin: true,
            ws: true }));
} else {
  app.use(express.static('../react-app/build'));
}

http.createServer(app).listen(serverPort, function () {
  console.log('Your server is listening on port %d (http://localhost:%d)', serverPort, serverPort);
  //console.log('Swagger-ui is available on http://localhost:%d/docs', serverPort);
});

