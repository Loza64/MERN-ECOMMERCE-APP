import Swal from 'sweetalert2';
import { ContextProvider } from '../Context/ContextConsumer';
import { Field, ErrorMessage, Formik, Form } from 'formik';
import { SignupContainer } from "./Styles/styled-components";
import PropTypes from 'prop-types';

SignUp.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func
}

export default function SignUp({ open, setOpen }) {

  const { signup } = ContextProvider();
  //Objects
  let expresiones = {
    username: /(^[A-Za-z]{1,10}([0-9]{3})){1}/,
    names: /^[a-zA-ZÁ-ÿ\s]{1,40}$/,
    surnames: /^[a-zA-ZÁ-ÿ\s]{1,40}$/,
    address: /^[a-zA-ZÁ-ÿ\s]{1,240}$/,
    email: /^(([^<>()[\].,;:\s@”]+(\.[^<>()[\].,;:\s@”]+)*)|(”.+”))@(([^<>()[\].,;:\s@”]+\.)+[^<>()[\].,;:s@”]{2,})$/,
    phone: /^[0-9]{8}$/
  }

  return (
    <SignupContainer formopen={open}>
      <div className="container-form-signup">
        <Formik
          initialValues={{
            username: '',
            names: '',
            surnames: '',
            address: '',
            birthdate: '',
            email: '',
            phone: '',
            pass: '',
          }}

          validate={(values) => {
            let errores = {}

            //Validate username
            if (!values.username) {
              errores.username = 'Campo obligatorio.'
            } else if (!expresiones.username.test(values.username) || values.username.length > 12) {
              errores.username = 'Nombre de username no valido.'
            }

            //Validate names
            if (!values.names) {
              errores.names = 'Campo names obligatorio.'
            } else if (!expresiones.names.test(values.names)) {
              errores.names = 'Nombres no validos.'
            }

            //Validate surnames
            if (!values.surnames) {
              errores.surnames = 'Campo surnames obligatorio.'
            } else if (!expresiones.surnames.test(values.surnames)) {
              errores.surnames = 'Apellidos no validos.'
            }

            if (!values.address) {
              errores.address = 'Campo obligatorio.';
            } else if (!expresiones.address.test()) {
              errores.address = 'La address no debe incluir numero o caracteres especiales.';
            }

            //Validate date
            if (!values.birthdate) {
              errores.birthdate = 'Campo obligatorio.';
            }

            //Validate email
            if (!values.email) {
              errores.email = 'Campo obligatorio.'
            } else if (!expresiones.email.test(values.email)) {
              errores.email = 'Correo no valido.'
            }

            //Validate phone
            if (!values.phone) {
              errores.phone = 'Campo obligatorio.'
            } else if (!expresiones.phone.test(values.phone)) {
              errores.phone = 'Teléfono no valido.'
            }

            //Validate pass
            if (!values.pass) {
              errores.pass = 'Campo obligatorio.'
            }
            return errores;
          }}

          onSubmit={(values) => {
            let timerInterval;
            Swal.fire({
              title: "Enviando informacion por favor espere",
              html: "Esto podria demorar unos segundos.",
              timer: 1000 * 60 * 60,
              timerProgressBar: true,
              didOpen: () => {
                Swal.showLoading();
                const timer = Swal.getPopup().querySelector("b");
                timerInterval = setInterval(() => {
                  timer.textContent = `${Swal.getTimerLeft()}`;
                }, 100);
              },
              willClose: () => {
                clearInterval(timerInterval);
              }
            }).then((result) => {
              /* Read more about handling dismissals below */
              if (result.dismiss === Swal.DismissReason.timer) {
                console.log("I was closed by the timer");
              }
            });
            signup(values).then(({ data }) => {
              const { state, message } = data;
              if (state) {
                Swal.fire({
                  title: message,
                  icon: "success"
                }).then(() => {
                  setOpen(false)
                })
              } else {
                Swal.fire({
                  icon: 'error',
                  title: 'Ocurrio un error en el registro!',
                  text: message
                })
              }
            }).catch((err) => {
              Swal.fire({
                title: err.message,
                icon: 'error',
                button: "Aceptar",
                footer: '<a href="mailto:ufostartservices@gmail.com">Report problem</a>'
              })
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
                <Field type="date" placeholder="Usuario" name="birthdate" />
                <ErrorMessage name="birthdate" component={() => (<label className="errormessage">{errors.birthdate}</label>)} />
                <Field type="text" placeholder="Correo electronico" name="email" />
                <ErrorMessage name="email" component={() => (<label className="errormessage">{errors.email}</label>)} />
                <Field type="tel" placeholder="Teléfono" name="phone" />
                <ErrorMessage name="phone" component={() => (<label className="errormessage">{errors.phone}</label>)} />
                <Field type="password" placeholder="Contraseña" name="pass" />
                <ErrorMessage name="pass" component={() => (<label className="errormessage">{errors.pass}</label>)} />
                <input type="submit" className="buttom buttom-dark" value="Registrame" style={{ width: '100%' }} />
              </Form>
            )
          }
        </Formik>
      </div>
    </SignupContainer>

  )
}