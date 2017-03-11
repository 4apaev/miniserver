'use strict';
const Path = require('path'),
      browserify = require('browserify');

module.exports = ({ basedir=process.cwd(), standalone='app', debug=true }={}) => function brws(req, res, next) {
  const entry = Path.join(basedir, req.pathname),
        bundle = browserify(entry, { standalone, debug })
                  .bundle();
  bundle.on('error', next);
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/javascript');
  res.setHeader('Transfer-Encoding', 'chunked');
  bundle.pipe(res);
}
