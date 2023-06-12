import { useMemo, useState } from 'react';
import './LoginPage.css';
import { useForm } from '../../hooks';

const loginFormFields = {
  loginEmail: '',
  loginPassword: '',
};

const registerFormFields = {
  registerName: '',
  registerEmail: '',
  registerPassword: '',
  registerPasswordRepeat: '',
};

export const LoginPage = () => {
  const {
    loginEmail,
    loginPassword,
    onInputChange: onLoginInputChange,
  } = useForm(loginFormFields);
  const {
    registerName,
    registerEmail,
    registerPassword,
    registerPasswordRepeat,
    onInputChange: onRegisterInputChange,
  } = useForm(registerFormFields);

  const [switchLogin, setSwitchLogin] = useState(true);
  const isLogin = useMemo(() => {
    if (switchLogin) {
      return true;
    }
    return false;
  }, [switchLogin]);

  const loginSubmit = (e) => {
    e.preventDefault();
  };

  const registerSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="container login-container">
      <div className="d-flex justify-content-center">
        {isLogin ? (
          <div className="col-md-6 login-form-1 ">
            <h3>Ingreso</h3>
            <form onSubmit={loginSubmit}>
              <div className="form-group mb-2">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Correo"
                  name="loginEmail"
                  value={loginEmail}
                  onChange={onLoginInputChange}
                />
              </div>
              <div className="form-group mb-2">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Contraseña"
                  name="loginPassword"
                  value={loginPassword}
                  onChange={onLoginInputChange}
                />
              </div>
              <div className="d-grid gap-2">
                <input type="submit" className="btnSubmit" value="Login" />
              </div>
              <div
                className="text-center mt-4"
                onClick={() => setSwitchLogin((prev) => !prev)}
              >
                <p>
                  ¿No tienes una cuenta?{' '}
                  <span className="text-primary">Registrate</span>
                </p>
              </div>
            </form>
          </div>
        ) : (
          <div className="col-md-6 login-form-2">
            <h3>Registro</h3>
            <form onSubmit={registerSubmit}>
              <div className="form-group mb-2">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nombre"
                  name="registerName"
                  value={registerName}
                  onChange={onRegisterInputChange}
                />
              </div>
              <div className="form-group mb-2">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Correo"
                  name="registerEmail"
                  value={registerEmail}
                  onChange={onRegisterInputChange}
                />
              </div>
              <div className="form-group mb-2">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Contraseña"
                  name="registerPassword"
                  value={registerPassword}
                  onChange={onRegisterInputChange}
                />
              </div>

              <div className="form-group mb-2">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Repita la contraseña"
                  name="registerPasswordRepeat"
                  value={registerPasswordRepeat}
                  onChange={onRegisterInputChange}
                />
              </div>

              <div className="d-grid gap-2">
                <input
                  type="submit"
                  className="btnSubmit"
                  value="Crear cuenta"
                />
              </div>
              <div
                className="text-center mt-4 text-white"
                onClick={() => setSwitchLogin((prev) => !prev)}
              >
                <p>
                  ¿Ya tienes una cuenta?{' '}
                  <span className="text-white">Inicia sesión</span>
                </p>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
