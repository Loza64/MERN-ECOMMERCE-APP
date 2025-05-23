import { ContextProvider } from '../Context/ContextConsumer';
import { Field, ErrorMessage, Formik, Form } from 'formik';
import { SignupContainer } from "./Styles/styled-components";
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

SignUp.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.bool.isRequired
}

export default function SignUp({ open, setOpen }) {

  const { signup, loadingSignUp } = ContextProvider();
  //Objects
  let expresiones = {
    username: /^[a-zA-ZÁ-ÿ0-9]{6,40}$/,
    names: /^[a-zA-ZÁ-ÿ\s]{3,40}$/,
    surnames: /^[a-zA-ZÁ-ÿ\s]{5,40}$/,
    address: /^[a-zA-ZÁ-ÿ\s-,().,]{5,240}$/,
    email: /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/,
    phone: /^[0-9]{8,30}$/,
    password: /^[a-zA-ZÁ-ÿ0-9\s-,().,]{5,40}$/
  }

  function GetAge(value) {
    const birthDate = new Date(value);
    const currentlyDate = new Date();

    let age = currentlyDate.getFullYear() - birthDate.getFullYear();

    const currentlyMonth = currentlyDate.getMonth();
    const birthMonth = birthDate.getMonth();

    // Verifica si aún no ha llegado el cumpleaños de este año
    if (currentlyMonth < birthMonth || ((currentlyMonth === birthMonth) && (birthDate.getDate() > currentlyDate.getDate()))) {
      age--;
    }

    return age;
  }

  return (
    <SignupContainer open={open}>
      <div className="container-form-signup">
        <Formik
          initialValues={{
            username: '',
            names: '',
            surnames: '',
            address: '',
            date: '',
            email: '',
            phone: '',
            password: '',
          }}

          validate={(values) => {
            let errores = {}

            //Validate username
            if (!values.username) {
              errores.username = 'Campo obligatorio.'
            } else if (values.username.length < 8) {
              errores.username = 'Minimo 6 caracteres'
            } else if (!expresiones.username.test(values.username)) {
              errores.username = 'No se admiten espacios en blanco ni caracteres especiales'
            }

            //Validate names
            if (!values.names) {
              errores.names = 'Campo obligatorio.'
            } else if (!expresiones.names.test(values.names)) {
              errores.names = 'Nombres no validos.'
            }

            //Validate surnames
            if (!values.surnames) {
              errores.surnames = 'Campo obligatorio.'
            } else if (!expresiones.surnames.test(values.surnames)) {
              errores.surnames = 'Apellidos no validos.'
            }

            if (!values.address) {
              errores.address = 'Campo obligatorio.';
            } else if (!expresiones.address.test(values.address)) {
              errores.address = 'La direccion no debe incluir caracteres especiales.';
            }

            //Validate date
            if (!values.date) {
              errores.date = 'Campo obligatorio.';
            } else if ((new Date(values.date)) > (new Date())) {
              errores.date = 'Seleccione una fecha de nacimiento valida.'
            } else if (GetAge(values.date) < 18) {
              errores.date = 'Debes ser mayor de edad para poder registrarte'
            }

            //Validate email
            if (!values.email) {
              errores.email = 'Campo obligatorio.'
            }
            if (values.email.length < 19) {
              errores.email = 'Correo no valido.'
            }
            else if (!expresiones.email.test(values.email)) {
              errores.email = 'Correo no valido.'
            }

            //Validate phone
            if (!values.phone) {
              errores.phone = 'Campo obligatorio.'
            }
            else if (!expresiones.phone.test(values.phone)) {
              errores.phone = 'Teléfono no valido.'
            }

            //Validate password
            if (!values.password) {
              errores.password = 'Campo obligatorio.'
            } else if (!expresiones.password.test(values.password)) {
              errores.password = 'Contraseña no valida'
            }
            return errores;
          }}

          onSubmit={(values) => {
            signup(values).then(({ state, message }) => {
              if (state) {
                toast.success(message, {
                  position: "bottom-right"
                })
                setOpen(false)
              } else {
                toast.warning(message, {
                  position: "bottom-right"
                })
              }
            });
          }}
        >
          {
            ({ errors }) => (
              <Form>
                <div className='closebuttom'>
                  <i className='buttom' onClick={() => { setOpen(false) }}>X</i>
                </div>
                <Field type="text" placeholder="Usuario" name="username" />
                <ErrorMessage name="username" component={() => (<label className="errormessage">{errors.username}</label>)} />
                <div style={{ marginBottom: "8px" }}>
                  <div className='flex' >
                    <div style={{ with: "50%" }}>
                      <Field type="text" placeholder="Nombres" name="names" />
                    </div>
                    <div style={{ with: "50%" }}>
                      <Field type="text" placeholder="Apellidos" name="surnames" />
                    </div>
                  </div>
                  <div className="flex" style={{ marginTop: "-5px" }}>
                    <div style={{ marginBottom: "-40px" }}>
                      <ErrorMessage name="names" component={() => (<label className="errormessage">{errors.names}</label>)} />
                    </div>
                    <div style={{ marginBottom: "-40px" }}>
                      <ErrorMessage name="surnames" component={() => (<label className="errormessage">{errors.surnames}</label>)} />
                    </div>
                  </div>
                </div>
                <Field type="text" placeholder="Ingrese su dirección" name="address" />
                <ErrorMessage name="address" component={() => (<label className="errormessage">{errors.address}</label>)} />
                <Field type="date" placeholder="Usuario" name="date" />
                <ErrorMessage name="date" component={() => (<label className="errormessage">{errors.date}</label>)} />
                <Field type="text" placeholder="Correo electronico" name="email" />
                <ErrorMessage name="email" component={() => (<label className="errormessage">{errors.email}</label>)} />
                <Field type="tel" placeholder="Teléfono" name="phone" />
                <ErrorMessage name="phone" component={() => (<label className="errormessage">{errors.phone}</label>)} />
                <Field type="password" placeholder="Contraseña" name="password" />
                <ErrorMessage name="password" component={() => (<label className="errormessage">{errors.password}</label>)} />
                <input type="submit" className="buttom buttom-dark" value={loadingSignUp ? "loading..." : "Registrame"} disabled={loadingSignUp} style={{ width: '100%' }} />
              </Form>
            )
          }
        </Formik>
      </div>
    </SignupContainer>

  )
}