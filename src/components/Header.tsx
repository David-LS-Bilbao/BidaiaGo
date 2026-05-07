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
          BidaiaGo
        </Link>

        <nav
          className={`nav-central ${
            open ? "activo" : ""
          }`}
        >
          <Link to="/">Home</Link>


          <Link to="/destinations">
            Destinos
          </Link>

          <Link to="/trip-list">
            Mi viaje
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
          onClick={() =>
            setOpen(!open)
          }
        >
          ☰
        </button>

      </div>
    </header>
  );
}

export default Header;
