'use strict'

const axios = require('axios')
const config = require('../config')

module.exports = data => {
  return new Promise(async (resolve, reject) => {
    const url = `${config.saveUrl}/search`
    const result = await axios(url)
    resolve(result.data.map(item => Object.assign(item, {id: item._id})))
  })
}
