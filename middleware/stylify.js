'use strict';

const Fs = require('fs');
const Styl = require('stylus');


module.exports = pugify;

function pugify(name, locals={}) {
  return function(req, res, next) {

      Styl(str)
        .set('filename', __dirname + '/test.styl')
        .import('mixins/vendor')
        .render((err, css) => {

          if (err)
            return next(err)

          res.statusCode = 200;
          res.setHeader('Content-Type', 'text/css');
          res.setHeader('Content-Length', css.length);
          res.end(css);

        });



  }
}


