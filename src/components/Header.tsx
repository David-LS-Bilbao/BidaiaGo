function Header() {
  return (
    <header className="cabecera">
      <div className="cabecera-contenedor">

        {/* Logo / título */}
        <h1 className="logo">BidaiaGo</h1>

        {/* Navegación */}
        <nav className="nav-central">
          <a href="#">Home</a>
          <a href="/tipsviajes">Tips Viajes</a>
          <a href="#">Destinos</a>
          <a href="#">Mi viaje</a>
          <a href="#">About</a>
        </nav>

        {/* Botón hamburguesa (para móvil) */}
        <button className="boton-hamburguesa">
          ☰
        </button>

      </div>
    </header>
  );
}

export default Header;
