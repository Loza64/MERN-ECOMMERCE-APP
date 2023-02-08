const bcrypt = require('bcrypt')

const EncryptPass = async (password) => {
  return await bcrypt.hash(password, 10)
}

const ComparePass = async (password, encryptpass) => {
  return await bcrypt.compare(password, encryptpass)
}

module.exports = {
  EncryptPass,
  ComparePass
}