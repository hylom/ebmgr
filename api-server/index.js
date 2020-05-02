const path = require('path');
const http = require('http');
const oas3Tools = require('oas3-tools');
const { createProxyMiddleware } = require('http-proxy-middleware');

const serverPort = 3333;

// OAS3 API server
const options = {
  controllers: path.join(__dirname, './controllers')
};
const oasDefinition = path.join(__dirname, 'api/openapi.yaml');
const expressAppConfig = oas3Tools.expressAppConfig(oasDefinition, options);
expressAppConfig.addValidator();
const app = expressAppConfig.getApp();

// add routes for React 
app.use(/^\/(?!(docs|api)\/).*/, createProxyMiddleware({ target: 'http://localhost:3000', changeOrigin: true }));

http.createServer(app).listen(serverPort, function () {
    console.log('Your server is listening on port %d (http://localhost:%d)', serverPort, serverPort);
    console.log('Swagger-ui is available on http://localhost:%d/docs', serverPort);
});

