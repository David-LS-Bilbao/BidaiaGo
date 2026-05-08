import { useState } from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import { useAuth } from "../hooks/useAuth";

import "../styles/auth.css";

const RegisterPage = () => {
  const { registerUser } = useAuth();

  const navigate = useNavigate();

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] = useState("");

  const handleSubmit = (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setError("");

    if (!name || !email || !password) {
      setError(
        "Todos los campos son obligatorios"
      );

      return;
    }

    try {
      registerUser(
        name,
        email,
        password
      );

      navigate("/");
    } catch {
      setError(
        "No se pudo registrar el usuario"
      );
    }
  };

  return (
    <main>
      <form
        className="formulario-auth"
        onSubmit={handleSubmit}
      >
        <h1>Crear cuenta</h1>

        <p className="subtitulo">
          Regístrate para guardar tus viajes
        </p>

        <div className="campo">
          <label>Nombre</label>

          <input
            type="text"
            placeholder="Tu nombre"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
          />
        </div>

        <div className="campo">
          <label>Email</label>

          <input
            type="email"
            placeholder="correo@email.com"
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
            placeholder="********"
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
          Registrarse
        </button>

        <p className="enlace-secundario">
          ¿Ya tienes cuenta?

          <Link to="/login">
            Inicia sesión
          </Link>
        </p>
      </form>
    </main>
  );
};

export default RegisterPage;
