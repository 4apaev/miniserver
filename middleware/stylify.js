'use strict';

const Fs = require('fs');
const Path = require('path');
const Styl = require('stylus');
const log = console.log.bind(console)

module.exports = stylify;

function stylify({ basedir=process.cwd() }={}) {
  return (req, res, next) => {
    let filename = Path.join(basedir, req.pathname.replace(/\.css$/, '.styl'))

    Fs.readFile(filename, (err, data) => {
      if (err) {
        res.statusCode = 404;
        return res.end()
      }

      Styl(data.toString())
        .set('filename', filename)
        .render((err, css) => {
          if (err)
            return next(err)

          res.writeHead(200, {
            'Content-Type': 'text/css',
            'Content-Length': css.length
          })

          res.end(css);
        })

    })
  }
}


