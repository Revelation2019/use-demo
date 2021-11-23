
const proxy = require('http-proxy-middleware');

module.exports = function (app) {
  // https://github.com/chimurai/http-proxy-middleware
  app.use(proxy([
    '/mock/16430'], {
    target: 'https://mock.yonyoucloud.com/',
    changeOrigin: true
  }));

  app.use(proxy([
    '/exportExcel'], {
    target: 'http://localhost:8088/',
    changeOrigin: true
  }));

  app.use(proxy([
    '/ws'], {
    target: 'http://localhost:8888/',
    changeOrigin: true
  }));
};
