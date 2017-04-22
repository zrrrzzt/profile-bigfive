'use strict'

const axios = require('axios')
const config = require('../config')
const encryptor = require('simple-encryptor')(config.encryptorSecret)

module.exports = data => {
  return new Promise(async (resolve, reject) => {
    const url = `${config.saveUrl}/search?user=${encryptor.hmac(data.user, 'hex')}`
    const result = await axios(url)
    resolve(result.data.map(item => Object.assign(item, {id: item._id})))
  })
}
