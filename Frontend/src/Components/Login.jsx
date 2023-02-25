import Swal from 'sweetalert2';
import { React, useState } from "react";
import { Field, Formik, Form } from 'formik';
import { useNavigate } from 'react-router-dom';
import { ContextProvider } from '../Context/Context';
import { LoginContainer } from "./Styles/styled-components";
import Cookies from 'universal-cookie';

export default function Login() {

  const cookies = new Cookies();
  const navigate = useNavigate();
  //Function context
  const { UserLogin } = ContextProvider();

  //hooks
  const [user, setUser] = useState(String);
  const [pass, setPass] = useState(String);
  const [state, setState] = useState(true);

  //object
  let body = {
    username: user,
    password: pass
  }

  return (
    <LoginContainer>
      <div className="container-form-login">
        <div className="content">

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
                    navigate("/");
                    cookies.set("UserCookies", UserResponce.data,{
                      expires: 1,
                      path: "/",
                      secure: true,
                    })
                  }
                })
              }
            })
          }}
        >
          {
            () => (
              <Form>
                <Field type="text" name="usuario" placeholder="usuario" />
                <Field type="password" name="password" placeholder="contraseña" />
                {!state ? (<label className='errormessage'>Usuario o contraseña incorrectos.</label>) : null}
                <input type="submit" value="Iniciar sesión" />
              </Form>
            )
          }
        </Formik>
      </div>
    </LoginContainer>
  )
}