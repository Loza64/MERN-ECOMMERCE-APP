import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { ContextProvider } from '../Context/ContextConsumer';
import { ButtomTransparent, LoginContainer } from "./Styles/styled-components";
import SignUp from './SignUp';
import { toast } from "react-toastify";

export default function Login() {
  const navigator = useNavigate();

  //Function context
  const { login, signout } = ContextProvider();

  //hooks
  const [user, setUser] = useState(String);
  const [pass, setPass] = useState(String);
  const [state, setState] = useState(true);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState(String)

  //object
  let body = {
    username: user,
    password: pass
  }

  window.addEventListener('load', () => {
    signout();
  })

  function LoginSubmit() {
    login(body).then(({ state, message }) => {
      if (!state) {
        setState(false);
        setMessage(message)
      } else {
        toast.success(message)
        setState(true);
        navigator("/");
      }
    });
  }

  return (
    <>
      <LoginContainer>
        <div className="container-form-login">
          <div className="content">
            <label>Registrate ahora en ECOMMERCE y realiza tus compras de forma rapida y segura.</label>
            <ButtomTransparent onClick={() => { setOpen(true) }}>Registrarme ahora!</ButtomTransparent>
          </div>
          <form onSubmit={(e) => { LoginSubmit(); e.preventDefault() }} >
            <label className="topic">Iniciar Sesión</label>
            <input type="text" name="usuario" placeholder="usuario" onChange={(e) => { setUser(e.target.value) }} />
            <input type="password" name="password" placeholder="contraseña" onChange={(e) => { setPass(e.target.value) }} />
            {!state && (<label className='errormessage'>{message}</label>)}
            <input type="submit" value="Iniciar sesión" />
            <a href='/#'>¿Olvidates tu contraseña</a>
          </form>
        </div>
      </LoginContainer>
      <SignUp open={open} setOpen={setOpen} />
    </>
  )
}