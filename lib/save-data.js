'use strict'

const axios = require('axios')
const ObjectID = require('bson-objectid')
const config = require('../config')
const encryptor = require('simple-encryptor')(config.encryptorSecret)
const generateJws = require('./generate-jws')

module.exports = async data => {
  let result
  let id = data.id

  const token = generateJws()

  axios.defaults.headers.common['Authorization'] = token

  delete data.id
  data.user = encryptor.encrypt(data.user)

  if (id !== false) {
    const url = `${config.saveUrl}/${id}`
    result = await axios.post(url, data)
  } else {
    id = ObjectID()
    const url = `${config.saveUrl}/${id}`
    result = await axios.put(url, data)
  }

  data = result.data

  return {
    id: data._id,
    name: data.name,
    description: data.description,
    url: data.url
  }
}
