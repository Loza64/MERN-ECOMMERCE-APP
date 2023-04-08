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

  let stateInputs = {
    username: true,
    names: true,
    surnames: true,
    address: true,
    date: true,
    email: true,
    phone: true,
    password: true
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
              stateInputs.username = false;
              errores.usuario = 'Campo obligatorio.'
            } else if (!expresiones.username.test(values.usuario)) {
              stateInputs.username = false;
              errores.usuario = 'Nombre de usuario no valido.'
            } else {
              setUser(values.usuario);
              stateInputs.username = true;
            }

            //Validate names
            if (!values.nombres) {
              stateInputs.names = false;
              errores.nombres = 'Campo nombres obligatorio.'
            } else if (!expresiones.names.test(values.nombres)) {
              stateInputs.names = false;
              errores.nombres = 'Nombres no validos.'
            } else {
              setNames(values.nombres);
              stateInputs.names = true;
            }

            //Validate surnames
            if (!values.apellidos) {
              stateInputs.surnames = false;
              errores.apellidos = 'Campo apellidos obligatorio.'
            } else if (!expresiones.surnames.test(values.apellidos)) {
              stateInputs.surnames = false;
              errores.apellidos = 'Apellidos no validos.'
            } else {
              stateInputs.surnames = true;
              setSurnames(values.apellidos);
            }

            if (!values.direccion) {
              stateInputs.address = false;
              errores.direccion = 'Campo obligatorio.';
            } else if (!expresiones.address.test()) {
              stateInputs.address = false;
              errores.direccion = 'La direccion no debe incluir numero o caracteres especiales.';
            } else {
              stateInputs.address = true;
              setAddress(values.direccion);
            }

            //Validate date
            if (!values.nacimiento) {
              stateInputs.date = false;
              errores.nacimiento = 'Campo obligatorio.';
            } else {
              stateInputs.date = true;
              setDate(values.nacimiento);
            }

            //Validate email
            if (!values.correo) {
              stateInputs.surnames = false;
              errores.correo = 'Campo obligatorio.'
            } else if (!expresiones.email.test(values.correo)) {
              stateInputs.email = false;
              errores.correo = 'Correo no valido.'
            } else {
              stateInputs.email = true;
              setEmail(values.correo);
            }

            //Validate phone
            if (!values.telefono) {
              stateInputs.surnames = false;
              errores.telefono = 'Campo obligatorio.'
            } else if (!expresiones.phone.test(values.telefono)) {
              stateInputs.phone = false;
              errores.telefono = 'Teléfono no valido.'
            } else {
              stateInputs.phone = true;
              setPhone(values.telefono);
            }

            //Validate pass
            if (!values.clave) {
              stateInputs.password = false;
              errores.clave = 'Campo obligatorio.'
            } else {
              stateInputs.password = true;
              setPassword(values.clave);
            }
            return errores;
          }}

          onSubmit={() => {
            try {
              UserSignUp(body).then((result) => {
                if (result.data) {
                  Swal.fire(
                    'En horabuena!',
                    'Registro realizado exitosamente, bienvenido a ECOMMERCE.',
                    'success'
                  )
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
                <div className='flex'>
                  <div style={{ with: "50%" }}>
                    <Field type="text" placeholder="Nombres" name="nombres" />
                  </div>
                  <div style={{ with: "50%" }}>
                    <Field type="text" placeholder="Apellidos" name="apellidos" />
                  </div>
                </div>
                <div className="flex" style={{ marginBottom: "-17px", marginTop: "-5px" }}>
                  <div>
                    <ErrorMessage name="nombres" component={() => (<label className="errormessage">{errors.nombres}</label>)} /> <br />
                  </div>
                  <div>
                    <ErrorMessage name="apellidos" component={() => (<label className="errormessage">{errors.apellidos}</label>)} />
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