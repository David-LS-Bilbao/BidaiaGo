import { useState } from "react";

import { Link } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";




function Header() {
  const [open, setOpen] = useState(false);

  const { user, logoutUser } =
    useAuth();

  return (
    <header className="cabecera">
      <div className="cabecera-contenedor">

        <Link
          to="/"
          className="logo"
        >
          <img className="imgLogo" src="/logoCompleto.png" alt="BidaiaGo" />
        </Link>

        <nav
          id="main-navigation"
          className={`nav-central ${
            open ? "activo" : ""
          }`}
        >
          <Link to="/dashboard">Explorar</Link>

          <Link to="/destinations">
            Destinos
          </Link>

          <Link to="/contact">
            Contacto
          </Link>


          {!user && (
            <>
              <Link to="/login">
                Login
              </Link>


            </>
          )}

          {user && (
            <>
              <Link
               to="/profile"
               className="nav-user"
                >
              {user.name}
              </Link>

              <button
                className="nav-logout"
                onClick={logoutUser}
              >
                Logout
              </button>
            </>
          )}
        </nav>

        <button
          className="boton-hamburguesa"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          aria-controls="main-navigation"
        >
          ☰
        </button>

      </div>
    </header>
  );
}

export default Header;
