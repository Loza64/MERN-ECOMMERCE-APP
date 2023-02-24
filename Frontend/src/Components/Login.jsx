import Swal from 'sweetalert2';
import { React, useState } from "react";
import { Field, Formik, Form } from 'formik'
import { ContextProvider } from '../Context/Context';
import { LoginContainer } from "./Styles/styled-components";

export default function Login() {
  //Function context
  const { UserLogin } = ContextProvider();

  //hooks
  const [user, setUser] = useState(String);
  const [pass, setPass] = useState(String);

  //object
  let body = {
    username: user,
    password: pass
  }

  return (
    <LoginContainer>
      <div className="container-form-login">
        <Formik
          initialValues={{
            usuario: String,
            password: String
          }}
          validate={(values) => {
            if (values.usuario) {
              setUser(values.usuario)
            }
            if (values.password) {
              setPass(values.password)
            }
          }}
          onSubmit={() => {
            UserLogin(body).then((result) => {
              if (result.data) {
                Swal.fire(
                  'En horabuena!',
                  'Inicio de sesión corrento.',
                  'success'
                );
              } else {
                Swal.fire({
                  icon: 'error',
                  title: 'Error de registro!',
                  text: 'Usuario o correo no validos.'
                });
              }
            })
          }}
        >
          {
            () => (
              <Form>
                <Field type="text" name="usuario" placeholder="usuario" />
                <Field type="password" name="password" placeholder="contraseña" />
                <input type="submit" value="Inciar sesión" />
              </Form>
            )
          }
        </Formik>
      </div>
    </LoginContainer>
  )
}