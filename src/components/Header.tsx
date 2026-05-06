import { useState } from "react";
import { Link } from "react-router-dom";
function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="cabecera">
      <div className="cabecera-contenedor">

        <Link to="/" className="logo">BidaiaGo</Link>

        <nav className={`nav-central ${open ? "activo" : ""}`}>
          <Link to="/">Home</Link>
          <Link to="/destinations">Destinos</Link>
          <Link to="/trip-list">Mi viaje</Link>
          <Link to="/about">About</Link>
          <Link to="/login">Login</Link>
        </nav>

        <button
          className="boton-hamburguesa"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>

      </div>
    </header>
  );
}
export default Header  
