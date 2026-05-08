import { useState } from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import { useAuth } from "../hooks/useAuth";

import "../styles/auth.css";

const LoginPage = () => {
  const { loginUser } = useAuth();

  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] = useState("");

  const handleSubmit = (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setError("");

    try {
      loginUser(email, password);

      navigate("/");
    } catch {
      setError("Credenciales incorrectas");
    }
  };

  return (
    <main >
      <form
        className="formulario-auth"
        onSubmit={handleSubmit}
      >
        <h1>Iniciar sesión</h1>

        <p className="subtitulo">
          Accede a tu cuenta de BidaiaGo
        </p>

        <div className="campo">
          <label>Email</label>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />
        </div>

        <div className="campo">
          <label>Contraseña</label>

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />
        </div>

        {error && (
          <p className="alerta-error">
            {error}
          </p>
        )}

        <button
          className="boton-primario"
          type="submit"
        >
          Entrar
        </button>

        <p className="enlace-secundario">
          ¿No tienes cuenta?

          <Link to="/register">
            Regístrate
          </Link>
        </p>
      </form>
    </main>
  );
};

export default LoginPage;