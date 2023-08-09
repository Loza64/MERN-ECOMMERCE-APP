import bcrypt from 'bcryptjs'

export const EncryptPass = async (password) => {
  return await bcrypt.hash(password, 10)
}

export const ComparePass = async (password, encryptpass) => {
  return await bcrypt.compare(password, encryptpass)
}