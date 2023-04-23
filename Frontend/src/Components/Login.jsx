import Swal from 'sweetalert2';
import { React, useState } from "react";
import { Field, Formik, Form } from 'formik';
import { ContextProvider } from '../Context/Context';
import { ButtomTransparent, LoginContainer } from "./Styles/styled-components";
import SignUp from './SignUp';

export default function Login() {
  //Function context
  const { UserLogin, CreateCookies} = ContextProvider();

  //hooks
  const [user, setUser] = useState(String);
  const [pass, setPass] = useState(String);
  const [state, setState] = useState(true);
  const [openSignup, setOpenSignup] = useState(false);

  //object
  let body = {
    username: user,
    password: pass
  }

  return (
    <div>
      <LoginContainer>
        <div className="container-form-login">
          <div className="content">
            <label>Registrate ahora en ECOMMERCE y realiza tus compras de forma rapida y segura.</label>
            <ButtomTransparent onClick={() => { setOpenSignup(true) }}>Registrarme ahora!</ButtomTransparent>
          </div>
          <Formik
            initialValues={{
              usuario: String,
              password: String
            }}
            validate={(values) => {
              let errors = {};
              if (!values.usuario) {
                setUser(null)
              } else {
                setUser(values.usuario)
              }

              if (!values.password) {
                setPass(null)
              } else {
                setPass(values.password)
              }
              return errors;
            }}
            onSubmit={() => {
              try {
                UserLogin(body).then((UserResponce) => {
                  if (!UserResponce.data) {
                    setState(false);
                  } else {
                    setState(true);
                    let timerInterval
                    Swal.fire({
                      title: 'Cargando su información!',
                      html: 'Por favor espere.',
                      timer: 2000,
                      timerProgressBar: true,
                      didOpen: () => {
                        Swal.showLoading()
                        const b = Swal.getHtmlContainer().querySelector('b')
                        timerInterval = setInterval(() => {
                          b.textContent = Swal.getTimerLeft()
                        }, 100)
                      },
                      willClose: () => {
                        clearInterval(timerInterval)
                      }
                    }).then((result) => {
                      /* Read more about handling dismissals below */
                      if (result.dismiss === Swal.DismissReason.timer) {
                        CreateCookies("USERCOOKIES", UserResponce.data);
                        window.location.href = "/Principal";
                      }
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
              () => (
                <Form>
                  <label className="topic">Iniciar Sesión</label>
                  <Field type="text" name="usuario" placeholder="usuario" />
                  <Field type="password" name="password" placeholder="contraseña" />
                  {!state ? (<label className='errormessage'>Usuario o contraseña incorrectos.</label>) : null}
                  <input type="submit" value="Iniciar sesión" />
                  <a href='/#'>¿Olvidates tu contraseña</a>
                </Form>
              )
            }
          </Formik>
        </div>
      </LoginContainer>
      <SignUp open={openSignup} setOpen={setOpenSignup} />
    </div>
  )
}