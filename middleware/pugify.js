'use strict';

const Pug = require('pug');
module.exports = pugify;

function pugify(name, locals={}) {
  return function(req, res) {
      const html = Pug.renderFile(name, locals);
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/html');
      res.setHeader('Content-Length', html.length);
      res.end(html);
  }
}