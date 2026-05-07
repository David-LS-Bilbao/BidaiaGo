import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";

import "../styles/auth.css";

const ProfilePage = () => {
  const {
    user,
    logoutUser,
    updateCurrentUser,
  } = useAuth();

  const navigate = useNavigate();

  const [isEditingName, setIsEditingName] =
    useState(false);

  const [isEditingEmail, setIsEditingEmail] =
    useState(false);

  if (!user) {
    return null;
  }

  const [name, setName] =
    useState(user.name);

  const [email, setEmail] =
    useState(user.email);

  const handleLogout = () => {
    logoutUser();

    navigate("/");
  };

  return (
    <main className="profile-page">
      <section className="profile-card">

        <div className="profile-header">

          <div className="profile-avatar">
            {name.charAt(0)}
          </div>

          <h1 className="profile-title">
            {name}
          </h1>

          <p className="profile-subtitle">
            Perfil de BidaiaGo
          </p>

        </div>

        <div className="profile-info">

          {/* NOMBRE */}

          <div className="profile-field">

            <span className="profile-label">
              Nombre
            </span>

            {!isEditingName ? (
              <>
                <p className="profile-value">
                  {name}
                </p>

                <button
                  className="profile-edit-button"
                  onClick={() =>
                    setIsEditingName(true)
                  }
                >
                  Cambiar nombre
                </button>
              </>
            ) : (
              <>
                <input
                  className="profile-input"
                  type="text"
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                />

                <div className="profile-inline-actions">

                  <button
                    className="boton-primario"
                    onClick={() => {
                      updateCurrentUser({
                        ...user,
                        name,
                        email,
                      });

                      setIsEditingName(false);
                    }}
                  >
                    Guardar
                  </button>

                  <button
                    className="boton-secundario"
                    onClick={() => {
                      setName(user.name);

                      setIsEditingName(false);
                    }}
                  >
                    Cancelar
                  </button>

                </div>
              </>
            )}

          </div>

          {/* EMAIL */}

          <div className="profile-field">

            <span className="profile-label">
              Email
            </span>

            {!isEditingEmail ? (
              <>
                <p className="profile-value">
                  {email}
                </p>

                <button
                  className="profile-edit-button"
                  onClick={() =>
                    setIsEditingEmail(true)
                  }
                >
                  Cambiar email
                </button>
              </>
            ) : (
              <>
                <input
                  className="profile-input"
                  type="email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                />

                <div className="profile-inline-actions">

                  <button
                    className="boton-primario"
                    onClick={() => {
                      updateCurrentUser({
                        ...user,
                        name,
                        email,
                      });

                      setIsEditingEmail(false);
                    }}
                  >
                    Guardar
                  </button>

                  <button
                    className="boton-secundario"
                    onClick={() => {
                      setEmail(user.email);

                      setIsEditingEmail(false);
                    }}
                  >
                    Cancelar
                  </button>

                </div>
              </>
            )}

          </div>

        </div>

        <div className="profile-actions">

          <button
            className="
              boton-secundario
              profile-logout
            "
            onClick={handleLogout}
          >
            Cerrar sesión
          </button>

        </div>

      </section>
    </main>
  );
};

export default ProfilePage;