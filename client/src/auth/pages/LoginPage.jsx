import { useMemo, useState } from 'react';
import './LoginPage.css';

export const LoginPage = () => {
  const [switchLogin, setSwitchLogin] = useState(true);
  const isLogin = useMemo(() => {
    if (switchLogin) {
      return true;
    }
    return false;
  }, [switchLogin]);

  return (
    <div className="container login-container">
      <div className="d-flex justify-content-center">
        {isLogin ? (
          <div className="col-md-6 login-form-1 ">
            <h3>Ingreso</h3>
            <form>
              <div className="form-group mb-2">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Correo"
                />
              </div>
              <div className="form-group mb-2">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Contraseña"
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
                  No tienes una cuenta? <a href="#!">Registrate</a>
                </p>
              </div>
            </form>
          </div>
        ) : (
          <div className="col-md-6 login-form-2">
            <h3>Registro</h3>
            <form>
              <div className="form-group mb-2">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nombre"
                />
              </div>
              <div className="form-group mb-2">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Correo"
                />
              </div>
              <div className="form-group mb-2">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Contraseña"
                />
              </div>

              <div className="form-group mb-2">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Repita la contraseña"
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
                  Ya tienes una cuenta?{' '}
                  <a className="text-white" href="">
                    Inicia sesión
                  </a>
                </p>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
