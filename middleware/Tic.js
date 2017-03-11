const Units =   [
    { name: 'day'    , ms: 1000*60*60*24 },
    { name: 'hour'   , ms: 1000*60*60 },
    { name: 'minute' , ms: 1000*60 }
  ]

const pad = x => x < 10 ? '0'+x : x

module.exports = class Tic extends Date {

  get year()     { return this.getFullYear() }
  get month()    { return 1+this.getMonth() }
  get date()     { return this.getDate() }
  get hours()    { return this.getHours() }
  get min()      { return this.getMinutes() }
  get sec()      { return this.getSeconds() }

  toStr() {
    return `${ pad(this.date) }/${ pad(this.month) }/${ this.year } ${ pad(this.hours) }:${ pad(this.min) }:${ pad(this.sec) }`
  }

  static get now() {
      return new Tic
    }

  static diff(a, b=Date.now(), buf=[]) {
      for(let x, i = 0, tm = Math.abs(a-b); i < Units.length; i++) {
        let { ms, name } = Units[ i ]
        if (x = 0|tm/ms) {
          x > 1 && (name+='s')
          buf.push(`${ x } ${ name }`)
          tm -= x * ms
        }
      }
      let n = buf.length-1
      n > 0 && (buf[ n ] = `and ${ buf[ n ] }`)
      return buf.join(' ')
    }
}