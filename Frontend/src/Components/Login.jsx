import Swal from 'sweetalert2';
import { React, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { ContextProvider } from '../Context/Context';
import { ButtomTransparent, LoginContainer } from "./Styles/styled-components";
import SignUp from './SignUp';

export default function Login() {
  const navigator = useNavigate();

  //Function context
  const { UserLogin, UserSignOut } = ContextProvider();

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

  window.addEventListener('load', () => {
    UserSignOut();
  })

  function LoginSubmit() {
    UserLogin(body).then((responce) => {
      if (!responce) {
        setState(false);
      } else {
        setState(true);
        navigator("/");
      }
    }).catch((err) => {
      Swal.fire({
        title: 'Connection server error',
        text: err + ', we will solve this problem as soon as possible.',
        icon: 'error',
        button: "Aceptar",
        footer: '<a href="mailto:ufostartservices@gmail.com">Report problem</a>'
      })
    });
  }

  return (
    <div>
      <LoginContainer>
        <div className="container-form-login">
          <div className="content">
            <label>Registrate ahora en ECOMMERCE y realiza tus compras de forma rapida y segura.</label>
            <ButtomTransparent onClick={() => { setOpenSignup(true) }}>Registrarme ahora!</ButtomTransparent>
          </div>
          <form onSubmit={(e) => { LoginSubmit(); e.preventDefault() }} >
            <label className="topic">Iniciar Sesión</label>
            <input type="text" name="usuario" placeholder="usuario" onChange={(e) => { setUser(e.target.value) }} />
            <input type="password" name="password" placeholder="contraseña" onChange={(e) => { setPass(e.target.value) }} />
            {!state ? (<label className='errormessage'>Usuario o contraseña incorrectos.</label>) : null}
            <input type="submit" value="Iniciar sesión" />
            <a href='/#'>¿Olvidates tu contraseña</a>
          </form>
        </div>
      </LoginContainer>
      <SignUp open={openSignup} setOpen={setOpenSignup} />
    </div>
  )
}