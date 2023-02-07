const bcrypt = require('bcrypt')

const EncyptPass = async (pass) => {
  return await bcrypt.hash(pass, 30, (err, encript) => {
    if (err) {
      console.log('Error de sifrado de contraseña: ' + err)
    } else {
      console.log('La encriptacion de contraseña es: ' + encript)
    }
  })
}

const ComparePass = async (encriptpass, pass) => {
  return await bcrypt.compare(pass, encriptpass)
}

module.exports = {
  EncyptPass,
  ComparePass
}