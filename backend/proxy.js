var express = require('express');
var { createProxyMiddleware } = require('http-proxy-middleware');
var app = express();
app.use('/api', createProxyMiddleware({target: 'http://localhost:3001/', changeOrigin: true}));
app.listen(3000);