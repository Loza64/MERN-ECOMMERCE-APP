import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { ContextProvider } from '../Context/ContextConsumer';
import { ButtomTransparent, LoginContainer } from "./Styles/styled-components";
import SignUp from './SignUp';
import { toast } from "react-toastify";

export default function Login() {
  const navigator = useNavigate();

  //Function context
  const { login, signout, loadingLogin, user } = ContextProvider();

  //hooks
  const [state, setState] = useState(true);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState(String)
  const [form, setForm] = useState({})


  useEffect(() => {
    if (user) { signout() }
  }, [])

  const LoginSubmit = async () => {
    const { state, message } = await login(form)
    if (!state) {
      setState(state)
      setMessage(message)
    } else {
      navigator("/")
      setState(state)
      toast.success(message)
    }
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
            <input type="text" name="usuario" placeholder="usuario" onChange={(e) => { setForm({ ...form, username: e.target.value }) }} />
            <input type="password" name="password" placeholder="contraseña" onChange={(e) => { setForm({ ...form, password: e.target.value }) }} />
            {!state && (<label className='errormessage'>{message}</label>)}
            <input type="submit" value={loadingLogin ? "loading..." : "Iniciar sesión"} disabled={loadingLogin} />
            <a href='/#'>¿Olvidates tu contraseña</a>
          </form>
        </div>
      </LoginContainer>
      <SignUp open={open} setOpen={setOpen} />
    </>
  )
}