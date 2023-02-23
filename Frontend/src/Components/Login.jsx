import Swal from 'sweetalert2';
import { ContextProvider } from '../Context/Context'
import { React, useState } from "react";
import { Field, ErrorMessage, Formik, Form } from 'formik'
import { FormContainer } from "./Styles/styled-components";

export default function Login() {
  // hooks
  const [user, setUser] = useState(String);
  const [names, setNames] = useState(String);
  const [surnames, setSurnames] = useState(String);
  const [date, setDate] = useState(String);
  const [email, setEmail] = useState(String);
  const [phone, setPhone] = useState(String);
  const [pass, setPass] = useState(String);

  let expresiones = {
    username: /^[a-zA-ZÁ-ÿ\s]{1,40}$/,
    names: /^[a-zA-ZÁ-ÿ\s]{1,40}$/,
    surnames: /^[a-zA-ZÁ-ÿ\s]{1,40}$/,
    email: /^(([^<>()[\].,;:\s@”]+(\.[^<>()[\].,;:\s@”]+)*)|(”.+”))@(([^<>()[\].,;:\s@”]+\.)+[^<>()[\].,;:s@”]{2,})$/,
    phone: /^09\d{8}$/
  }

  let stateInputs = {
    usuario: false,
    nombres: false,
    apellidos: false,
    nacimiento: false,
    correo: false,
    telefono: false,
    clave: false
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

  const { UserSignUp, UserLogin } = ContextProvider();

  return (
    <FormContainer>
      <Formik

        initialValues={{
          usuario: String,
          nombres: String,
          apellidos: String,
          nacimiento: String,
          correo: String,
          telefono: String,
          clave: String,
        }}

        validate={(values) => {
          let errors = {}

          //Validate username
          if (values.usuario) {
            if (expresiones.username.test(values.usuario)) {
              stateInputs.usuario = true;
              setUser(values.usuario);
            } else {
              stateInputs.usuario = false;
              errors.usuario = 'Usuario no valido'
            }
          } else {
            stateInputs.usuario = false;
            errors.usuario = 'Campo obligatorio'
          }

          //Validate names
          if (values.nombres) {
            if (expresiones.names.test(values.nombres)) {
              stateInputs.nombres = true;
              setNames(values.nombres);
            } else {
              stateInputs.nombres = false;
              errors.nombres = 'Nombre no valido'
            }
          } else {
            stateInputs.nombres = false;
            errors.nombres = 'Campo obligatorio'
          }

          //Validate surnames
          if (values.apellidos) {
            if (expresiones.surnames.test(values.apellidos)) {
              stateInputs.apellidos = true;
              setSurnames(values.apellidos);
            } else {
              stateInputs.apellidos = false;
              errors.apellidos = 'Apellidos no valido'
            }
          } else {
            stateInputs.apellidos = false;
            errors.apellidos = 'Campo obligatorio'
          }

          //Validate date
          if (values.nacimiento) {
            stateInputs.nacimiento = true;
            setDate(values.nacimiento);
          } else {
            stateInputs.nacimiento = false;
          }

          //Validate email
          if (values.correo) {
            if (expresiones.surnames.test(values.correo)) {
              stateInputs.correo = true;
              setEmail(values.correo);
            } else {
              stateInputs.correo = false;
              errors.correo = 'Correo no valido'
            }
          } else {
            stateInputs.apellidos = false;
            errors.apellidos = 'Campo obligatorio'
          }

          //Validate phone
          if (values.telefono) {
            if (expresiones.surnames.test(values.telefono)) {
              stateInputs.telefono = true;
              setPhone(values.telefono);
            } else {
              stateInputs.telefono = false;
              errors.telefono = 'Teléfono no valido'
            }
          } else {
            stateInputs.apellidos = false;
            errors.apellidos = 'Campo obligatorio'
          }

          //Validate pass
          if (values.clave) {
            stateInputs.clave = true;
            setPass(values.clave);
          } else {
            stateInputs.clave = false;
            errors.clave = 'Campo obligatorio'
          }
        }}

        onSubmit={() => {
          if (stateInputs.usuario || stateInputs.nombres || stateInputs.apellidos || stateInputs.nacimiento || stateInputs.correo || stateInputs.telefono || stateInputs.clave) {
            UserSignUp(body).then((result)=>{
              if(result){

              }else{
                
              }
            })
          } else {

          }
        }}
      >
        {
          ({ errors }) => (
            <Form>

            </Form>
          )
        }
      </Formik>
    </FormContainer>
  )
}