const path = require('path');
const http = require('http');
const oas3Tools = require('oas3-tools');
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const serverPort = 3333;

// check running environment
const mode = process.env.EBM_MODE || 'development';

// OAS3 API server
const options = {
  controllers: path.join(__dirname, './controllers')
};
const oasDefinition = path.join(__dirname, 'api/openapi.yaml');
const expressAppConfig = oas3Tools.expressAppConfig(oasDefinition, options);
expressAppConfig.addValidator();
const app = expressAppConfig.getApp();

if (mode == 'development') {
  // add routes for React
  app.use(/^\/(?!(docs|api)\/).*/, createProxyMiddleware({ target: 'http://localhost:3000', changeOrigin: true }));
} else {
  app.use(express.static('public'));
}

http.createServer(app).listen(serverPort, function () {
    console.log('Your server is listening on port %d (http://localhost:%d)', serverPort, serverPort);
    console.log('Swagger-ui is available on http://localhost:%d/docs', serverPort);
});

