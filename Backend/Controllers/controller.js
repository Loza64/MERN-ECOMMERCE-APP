const uniquid = require('uniquid')
const jsontoken = require('jsonwebtoken')
const SendEmail = require('../Libraries/nodemailer')
const { UploadImage, DeleteImage } = require('../Libraries/cloudinary')
const { ComparePass, EncryptPass } = require('../Libraries/bcrypt')
const { Categories, Detailsales, Products, Sales, Users } = require('../Models/Model')
const datakey = uniquid();

const SignUp = async (req, res) => {
  const { usuario, nombres, apellidos, naciminento, correo, telefono, clave, tipo } = req.body;
  const encryptpass = await EncryptPass(clave)
  const user = new Users({
    key: datakey,
    username: usuario,
    names: nombres,
    surnames: apellidos,
    date: naciminento,
    email: correo,
    phone: telefono,
    password: encryptpass,
    type: tipo
  })
  user.save((err) => {
    if (err) {
      res.send('Lo sentimos ocurrio un error inesperado')
    } else {
      res.send('Registro realisado exitosamente')
    }
  });
};

const Login = async (req, res) => {
  const { user, pass } = req
  const users = await Users.findOne(user);
  if (users.key != null) {
    const checkpass = await ComparePass(pass, users.password);
    if (checkpass) {
      res.send(users)
    } else {
      res.send(null);
    }
  } else {
    res.send(null);
  }
}

const GetProducts = (req, res) =>{
  Products.find({},(err,docs)=>{
    if(!err){
      res.send(docs);
    }else{
      console.error(error);
    }
  })
}
module.exports = {
  SignUp,
  Login,
  GetProducts
}