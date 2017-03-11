'use strict';

const Fs = require('fs')
const Tic = require('./Tic')
const start = Tic.now
const uptime = () => `
=========== UPTIME ===========
   ${ Tic.diff(start) }
==============================
`

module.exports = logger

function logger(filename, ...args) {
  let times = 10
  return (req, res, next) => {
    times -=1
    res.once('finish', () => {
      let buf = args.map(k => req[ k ] || res[ k ])
      times <= 0 && buf.push(uptime(times=10))
      save(filename, ...buf)
    });
    next();
  }
}

function save(filename, ...args) {
  let now = Tic.now.toStr()
  Fs.appendFile(filename, `
${ now }, ${ args.join(', ') }`, () => console.log(now, ...args))
}

