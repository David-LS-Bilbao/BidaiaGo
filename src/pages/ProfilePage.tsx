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

  if (!user) return null;

  const [name, setName] =
    useState(user.name);

  const [email, setEmail] =
    useState(user.email);

  const [success, setSuccess] =
    useState("");

  const [isEditingName, setIsEditingName] =
    useState(false);

  const [isEditingEmail, setIsEditingEmail] =
    useState(false);

  const handleSave = () => {
    updateCurrentUser({
      ...user,
      name,
      email,
    });

    setSuccess(
      "Perfil actualizado correctamente"
    );

    setIsEditingName(false);
    setIsEditingEmail(false);
  };

  const handleLogout = () => {
    logoutUser();
    navigate("/");
  };

  return (
    <main className="profile-page">

      <section className="profile-card">

        {success && (
          <div className="profile-success">
            {success}
          </div>
        )}

        <div className="profile-header">

          <h1 className="profile-title">
            {user.name}
          </h1>

        
        </div>

        <div className="profile-info">

          {/* NOMBRE */}
          <div className="profile-field">

            <span className="profile-label">
              Nombre
            </span>

            {isEditingName ? (
              <div className="campo">
                <input
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                />
              </div>
            ) : (
              <p className="profile-value">
                {name}
              </p>
            )}

            <button
              className="boton-primario"
              onClick={() => {
                if (isEditingName) {
                  handleSave();
                } else {
                  setIsEditingName(true);
                }
              }}
            >
              {isEditingName
                ? "Guardar nombre"
                : "Editar nombre"}
            </button>
          </div>

          {/* EMAIL */}
          <div className="profile-field">

            <span className="profile-label">
              Email
            </span>

            {isEditingEmail ? (
              <div className="campo">
                <input
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                />
              </div>
            ) : (
              <p className="profile-value">
                {email}
              </p>
            )}

            <button
              className="boton-primario"
              onClick={() => {
                if (isEditingEmail) {
                  handleSave();
                } else {
                  setIsEditingEmail(true);
                }
              }}
            >
              {isEditingEmail
                ? "Guardar email"
                : "Editar email"}
            </button>
          </div>

        </div>

        <div className="profile-actions">

          <button
            className="boton-primario profile-logout"
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