import Swal from 'sweetalert2';
import { ContextProvider } from '../Context/Context';
import { React, useState } from "react";
import { Field, ErrorMessage, Formik, Form } from 'formik'
import { SignupContainer } from "./Styles/styled-components";

export default function SignUp({ open, setOpen }) {

  const { UserSignUp } = ContextProvider();
  // hooks
  const [user, setUser] = useState(String);
  const [names, setNames] = useState(String);
  const [surnames, setSurnames] = useState(String);
  const [address, setAddress] = useState(String);
  const [date, setDate] = useState(String);
  const [email, setEmail] = useState(String);
  const [phone, setPhone] = useState(String);
  const [password, setPassword] = useState(String);

  //Objects
  let expresiones = {
    username: /(^[A-Za-z]{1,10}([0-9]{3})){1}/,
    names: /^[a-zA-ZÁ-ÿ\s]{1,40}$/,
    surnames: /^[a-zA-ZÁ-ÿ\s]{1,40}$/,
    address: /^[a-zA-ZÁ-ÿ\s]{1,240}$/,
    email: /^(([^<>()[\].,;:\s@”]+(\.[^<>()[\].,;:\s@”]+)*)|(”.+”))@(([^<>()[\].,;:\s@”]+\.)+[^<>()[\].,;:s@”]{2,})$/,
    phone: /^[0-9]{8}$/
  }

  let body = {
    usuario: user,
    nombres: names,
    apellidos: surnames,
    direccion: address,
    nacimiento: date,
    correo: email,
    telefono: phone,
    pass: password,
    tipo: "Cliente"
  }

  return (
    <SignupContainer formopen={open}>
      <div className="container-form-signup">
        <Formik
          initialValues={{
            usuario: '',
            nombres: '',
            apellidos: '',
            direccion: '',
            nacimiento: '',
            correo: '',
            telefono: '',
            clave: '',
          }}

          validate={(values) => {
            let errores = {}

            //Validate username
            if (!values.usuario) {
              errores.usuario = 'Campo obligatorio.'
            } else if (!expresiones.username.test(values.usuario) || values.usuario.length > 12) {
              errores.usuario = 'Nombre de usuario no valido.'
            } else {
              setUser(values.usuario);
            }

            //Validate names
            if (!values.nombres) {
              errores.nombres = 'Campo nombres obligatorio.'
            } else if (!expresiones.names.test(values.nombres)) {
              errores.nombres = 'Nombres no validos.'
            } else {
              setNames(values.nombres);
            }

            //Validate surnames
            if (!values.apellidos) {
              errores.apellidos = 'Campo apellidos obligatorio.'
            } else if (!expresiones.surnames.test(values.apellidos)) {
              errores.apellidos = 'Apellidos no validos.'
            } else {
              setSurnames(values.apellidos);
            }

            if (!values.direccion) {
              errores.direccion = 'Campo obligatorio.';
            } else if (!expresiones.address.test()) {
              errores.direccion = 'La direccion no debe incluir numero o caracteres especiales.';
            } else {
              setAddress(values.direccion);
            }

            //Validate date
            if (!values.nacimiento) {
              errores.nacimiento = 'Campo obligatorio.';
            } else {
              setDate(values.nacimiento);
            }

            //Validate email
            if (!values.correo) {
              errores.correo = 'Campo obligatorio.'
            } else if (!expresiones.email.test(values.correo)) {
              errores.correo = 'Correo no valido.'
            } else {
              setEmail(values.correo);
            }

            //Validate phone
            if (!values.telefono) {
              errores.telefono = 'Campo obligatorio.'
            } else if (!expresiones.phone.test(values.telefono)) {
              errores.telefono = 'Teléfono no valido.'
            } else {
              setPhone(values.telefono);
            }

            //Validate pass
            if (!values.clave) {
              errores.clave = 'Campo obligatorio.'
            } else {
              setPassword(values.clave);
            }
            return errores;
          }}

          onSubmit={() => {
            try {
              UserSignUp(body).then((result) => {
                if (result) {
                  Swal.fire(
                    'En horabuena!',
                    'Registro realizado exitosamente, bienvenido a ECOMMERCE.',
                    'success'
                  ).then(() => {
                    setOpen(false)
                  })
                } else {
                  Swal.fire({
                    icon: 'error',
                    title: 'Ocurrio un error en el registro!',
                    text: 'Nombre de usuario, email o teléfono ya son utlizados por otro usuario.'
                  })
                }
              })
            } catch (error) {
              Swal.fire({
                icon: 'error',
                title: 'Lo sentimos ocurrio un error en el servidor!',
                text: 'Información del error: ' + error + ' si el error persiste comuniqueselo al desarrolador inmediatamente, lamentamos los inconvenientes'
              })
            }
          }}
        >
          {
            ({ errors }) => (
              <Form>
                <div className='closebuttom'>
                  <i className='buttom' onClick={() => { setOpen(false) }}>X</i>
                </div>
                <Field type="text" placeholder="Usuario" name="usuario" />
                <ErrorMessage name="usuario" component={() => (<label className="errormessage">{errors.usuario}</label>)} />
                <div style={{ marginBottom: "8px" }}>
                  <div className='flex' >
                    <div style={{ with: "50%" }}>
                      <Field type="text" placeholder="Nombres" name="nombres" />
                    </div>
                    <div style={{ with: "50%" }}>
                      <Field type="text" placeholder="Apellidos" name="apellidos" />
                    </div>
                  </div>
                  <div className="flex" style={{ marginTop: "-5px" }}>
                    <div style={{ marginBottom: "-40px" }}>
                      <ErrorMessage name="nombres" component={() => (<label className="errormessage">{errors.nombres}</label>)} />
                    </div>
                    <div style={{ marginBottom: "-40px" }}>
                      <ErrorMessage name="apellidos" component={() => (<label className="errormessage">{errors.apellidos}</label>)} />
                    </div>
                  </div>
                </div>
                <Field type="text" placeholder="Ingrese su dirección" name="direccion" />
                <ErrorMessage name="direccion" component={() => (<label className="errormessage">{errors.direccion}</label>)} />
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
      </div>
    </SignupContainer>

  )
}