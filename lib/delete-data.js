'use strict'

const axios = require('axios')
const config = require('../config')
const generateJws = require('./generate-jws')

module.exports = async dataKey => {
  let data = {}
  const token = generateJws()
  axios.defaults.headers.common['Authorization'] = token

  if (dataKey) {
    const url = `${config.saveUrl}/${dataKey}`
    const result = await axios.delete(url)
    data = result.data
  }

  return data
}
