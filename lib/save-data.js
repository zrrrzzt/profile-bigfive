'use strict'

const axios = require('axios')
const ObjectID = require('bson-objectid')
const config = require('../config')
const encryptor = require('simple-encryptor')(config.encryptorSecret)
const generateJws = require('./generate-jws')

module.exports = async data => {
  let postData = JSON.parse(JSON.stringify(data))

  const token = generateJws()

  axios.defaults.headers.common['Authorization'] = token

  postData.user = encryptor.hmac(data.user, 'hex')
  delete postData.id

  if (data.id !== false) {
    const url = `${config.saveUrl}/${data.id}`
    await axios.post(url, data)
  } else {
    data.id = ObjectID()
    const url = `${config.saveUrl}/${data.id}`
    await axios.put(url, postData)
  }

  delete data.user
  data.id = data.id.toString()

  return data
}
