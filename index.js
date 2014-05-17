var path = require('path')
  , exec = require('child_process').exec

var BAD_VALUE = new Object

module.exports = mdls

function mdls(file, ready) {
  var file = path.resolve(file)

  exec('mdls ' + file, function(err, raw_data) {
    if(err) {
      ready(err)
    }

    ready(null, deserialize(raw_data))
  })
}

function deserialize(raw_data) {
  var splits = raw_data.split('\n') // only targets osx
    , lines = []
    , data = {}

  for(var i = 0, len = splits.length; i < len; ++i) {
    if(splits[i].indexOf('=') === - 1) {
      lines[lines.length - 1] = lines[lines.length - 1] + splits[i].trim()

      continue
    }

    lines[lines.length] = splits[i].trim()
  }

  var value
    , key
    , kv

  for(var i = 0, len = lines.length; i < len; ++i) {
    kv = lines[i].split('=')
    key = kv[0].trim().replace('kMD', '')
    value = kv[1].trim()

    if(value[0] === '(' && value[value.length - 1] === ')') {
      value = value.slice(1, -1).split(',').map(to_js_type(key))
    } else {
      value = to_js_type(key)(value)
    }

    data[key] = value
  }

  return data
}

function to_js_type(key) {
  return function(value) {
    if(value[0] === '"' && value[value.length - 1] === '"') {
      return value.slice(1, -1)
    }

    var as_num = +value

    if(!isNaN(as_num)) {
      return as_num
    }

    var as_date = new Date(value)

    if(isNaN(as_date.getTime())) {
      bad_value(key, value)
    }

    return as_date
  }
}

function bad_value(key, value) {
  throw new Error('invalid value: ' + value + ' for key: ' + key)
}
