import path from 'node:path';
import {exec} from 'node:child_process';

/**
 * @typedef {(
 *   err?: null|import('node:child_process').ExecException,
 *   deserialized?: {}
 * ) => void} MdlsReady
 */

/**
 * @param {string} file
 * @param {string|MdlsReady} [args]
 * @param {MdlsReady} [ready]
 */
function mdls(file, args, ready) {
  if (typeof args !== 'string') {
      ready = args;
  }
  file = path.resolve(file).replace(/ /g, '\\ ')

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

/**
 * @typedef {string | number | Date | null |
 *   (string | number | Date | null)[]} MdlsValue
 */

/**
 * @param {string} raw_data
 */
function deserialize(raw_data) {
  const splits = raw_data.split('\n') // only targets osx
    , lines = []
    , /** @type {Record<string, MdlsValue>} */ data = {}

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

    /** @type {MdlsValue} */
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

/**
 * @param {string} key
 */
function to_js_type(key) {
  /**
   * @param {string|null} value
   */
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

    if(isNaN(as_date.getTime())) {
      bad_value(key, value)
    }

    return as_date
  }
}

/**
 * @param {string} key
 * @param {string} value
 */
function bad_value(key, value) {
  throw new Error('invalid value: ' + value + ' for key: ' + key)
}

export default mdls;
