'use strict'

module.exports = {
  authUrl: process.env.AUTH_URL || 'https://login.bigfive.world',
  saveUrl: process.env.SAVE_URL || 'https://profiles.save.bigfive.world',
  jwtSecret: process.env.JWT_SECRET || 'Gibberish, jibberish, jibber-jabber and gobbledygook',
  encryptorSecret: process.env.ENCRYPTOR_SECRET || 'When you rush around in hopeless circles. Searching everywhere for something true'
}
