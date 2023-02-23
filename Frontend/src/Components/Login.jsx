import Swal from 'sweetalert2';
import { ContextProvider } from '../Context/Context'
import { React, useState } from "react";
import { Field, ErrorMessage, Formik, Form } from 'formik'
import { FormContainer } from "./Styles/styled-components";
import { useNavigate } from 'react-router-dom'

export default function Login() {
  // hooks
  const [user, setUser] = useState("");
  const [names, setNames] = useState("");
  const [surnames, setSurnames] = useState("");
  const [date, setDate] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();

  let expresiones = {
    username: /^[a-zA-ZÁ-ÿ\s]{1,40}$/,
    names: /^[a-zA-ZÁ-ÿ\s]{1,40}$/,
    surnames: /^[a-zA-ZÁ-ÿ\s]{1,40}$/,
    email: /^(([^<>()[\].,;:\s@”]+(\.[^<>()[\].,;:\s@”]+)*)|(”.+”))@(([^<>()[\].,;:\s@”]+\.)+[^<>()[\].,;:s@”]{2,})$/,
    phone: /^09\d{8}$/
  }

  let stateInputs = {
    usuario: true,
    nombres: true,
    apellidos: true,
    nacimiento: true,
    correo: true,
    telefono: true,
    clave: true
  }

  let body = {
    usuario: user,
    nombres: names,
    apellidos: surnames,
    nacimiento: date,
    correo: email,
    telefono: phone,
    clave: pass,
    tipo: "Cliente"
  }

  const { UserSignUp } = ContextProvider();

  return (
    <FormContainer>
      <Formik

        initialValues={{
          usuario: '',
          nombres: '',
          apellidos: '',
          nacimiento: '',
          correo: '',
          telefono: '',
          clave: '',
        }}

        validate={(values) => {
          let errores = {}

          //Validate username
          if (!values.usuario) {
            stateInputs.usuario = false;
            errores.usuario = 'Campo obligatorio'
          } else if (!expresiones.username.test(values.usuario)) {
            stateInputs.usuario = false;
            errores.usuario = 'Usuario no valido'
          } else {
            stateInputs.usuario = true;
            setUser(values.usuario);
          }

          //Validate names
          if (!values.nombres) {
            stateInputs.nombres = false;
            errores.nombres = 'Campo obligatorio'
          } else if (!expresiones.names.test(values.nombres)) {
            stateInputs.nombres = false;
            errores.nombres = 'Nombre no valido'
          } else {
            stateInputs.nombres = true;
            setNames(values.nombres);
          }

          //Validate surnames
          if (!values.apellidos) {
            stateInputs.apellidos = false;
            errores.apellidos = 'Campo obligatorio'
          } else if (!expresiones.surnames.test(values.apellidos)) {
            stateInputs.apellidos = false;
            errores.apellidos = 'Apellidos no valido'
          } else {
            stateInputs.apellidos = true;
            setSurnames(values.apellidos);
          }

          //Validate date
          if (!values.nacimiento) {
            stateInputs.nacimiento = false;
            errores.nacimiento = 'Campo obligatorio'
          } else {
            stateInputs.nacimiento = true;
            setDate(values.nacimiento);
          }

          //Validate email
          if (!values.correo) {
            stateInputs.apellidos = false;
            errores.apellidos = 'Campo obligatorio'
          } else if (!expresiones.surnames.test(values.correo)) {
            stateInputs.correo = false;
            errores.correo = 'Correo no valido'
          } else {
            stateInputs.correo = true;
            setEmail(values.correo);
          }

          //Validate phone
          if (!values.telefono) {
            stateInputs.apellidos = false;
            errores.apellidos = 'Campo obligatorio'
          } else if (!expresiones.surnames.test(values.telefono)) {
            stateInputs.telefono = false;
            errores.telefono = 'Teléfono no valido'
          } else {
            stateInputs.telefono = true;
            setPhone(values.telefono);
          }


          //Validate pass
          if (!values.clave) {
            stateInputs.clave = false;
            errores.clave = 'Campo obligatorio'
          } else {
            stateInputs.clave = true;
            setPass(values.clave);
          }
        }}

        onSubmit={() => {
          if (stateInputs.usuario && stateInputs.nombres && stateInputs.apellidos
            && stateInputs.nacimiento && stateInputs.correo && stateInputs.telefono && stateInputs.clave) {
            UserSignUp(body).then((result) => {
              if (result.data) {
                Swal.fire(
                  'En horabuena!',
                  'Registro realizado exitosamente, bienvenido a ECOMMERCE.',
                  'success'
                ).then(() => {
                  navigate("/");
                })
              } else {
                Swal.fire({
                  icon: 'error',
                  title: 'Error de registro!',
                  text: 'Nombre de usuario, email o teléfono ya son utlizados por otro usuario.'
                })
              }
            }).catch((err) => {
              Swal.fire({
                icon: 'error',
                title: 'Lo sentimos ocurrio un error en el servidor',
                text: 'Información del error ' + err + ' Si el error persiste comunicate con nostros lo mas rapido posible.',
                footer: '<a href="">¿Quieres enviar un email acerca del error?</a>'
              })
            })
          }
        }}
      >
        {
          ({ errors }) => (
            <Form>
              <Field type="text" placeholder="Usuario" name="usuario" />
              <ErrorMessage name="usuario" component={() => (<label className="errormessage">{errors.usuario}</label>)} />
              <Field type="text" placeholder="Nombres" name="nombres" />
              <ErrorMessage name="nombres" component={() => (<label className="errormessage">{errors.nombres}</label>)} />
              <Field type="text" placeholder="Apellidos" name="apellidos" />
              <ErrorMessage name="apellidos" component={() => (<label className="errormessage">{errors.apellidos}</label>)} />
              <Field type="date" placeholder="Usuario" name="nacimiento" />
              <ErrorMessage name="nacimiento" component={() => (<label className="errormessage">{errors.nacimiento}</label>)} />
              <Field type="text" placeholder="Correo electronico" name="correo" />
              <ErrorMessage name="correo" component={() => (<label className="errormessage">{errors.correo}</label>)} />
              <Field type="tel" placeholder="Teléfono" name="telefono" />
              <ErrorMessage name="telefono" component={() => (<label className="errormessage">{errors.telefono}</label>)} />
              <Field type="password" placeholder="Contraseña" name="clave" />
              <ErrorMessage name="clave" component={() => (<label className="errormessage">{errors.clave}</label>)} />
              <input type="submit" className="buttom buttom-dark" value="Registrame" style={{ width: '100%' }} />
            </Form>
          )
        }
      </Formik>
    </FormContainer>
  )
}