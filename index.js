'use strict';

const path = require('path')
  , {exec} = require('child_process')

module.exports = mdls

function mdls(file, args, ready) {
  if (typeof args !== 'string') {
      ready = args;
  }
  file = path.resolve(file)
      .replace(/ /g, '\\ ')
      .replace(/\(/g, '\\(')
      .replace(/\)/g, '\\)')

  return new Promise((resolve, reject) => {
      exec('mdls ' + (args ? args + ' ' : '') + file, function(err, raw_data) {
        if(err) {
          if (ready) ready(err)
          reject(err);
          return;
        }

        const deserialized = deserialize(raw_data);
        if (ready) ready(null, deserialized)
        resolve(deserialized);
      })
  });
}

function deserialize(raw_data) {
  const splits = raw_data.split('\n') // only targets osx
    , lines = []
    , data = {}

  for (const split of splits) {
    if(!split.includes('=')) {
      lines[lines.length - 1] += split.trim()

      continue
    }

    lines[lines.length] = split.trim()
  }

  for (const line of lines) {
    const kv = line.split('=')
    const key = kv[0].trim().replace('kMD', '')
    let value = kv[1].trim()

    if(value === '(null)') {
      value = null;
    } else if (value[0] === '(' && value[value.length - 1] === ')') {
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
    if (value === null) {
      return null;
    }
    if(value[0] === '"' && value[value.length - 1] === '"') {
      return value.slice(1, -1)
    }

    const as_num = +value

    if(!isNaN(as_num)) {
      return as_num
    }

    const as_date = new Date(value)

    if(!isNaN(as_date.getTime())) {
      return as_date
    }

    // handle cases like `("H.264",AAC)` where AAC doesn't
    // get wrapped with double-quotes
    if (/[a-zA-Z]+/.test(value)) {
      return value
    }

    bad_value(key, value)
  }
}

function bad_value(key, value) {
  throw new Error('invalid value: ' + value + ' for key: ' + key)
}
