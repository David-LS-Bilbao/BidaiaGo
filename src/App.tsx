import "./styles/styles.css";
import Header from './components/Header'
import Footer from './components/Footer'

function App() {
  return (
    <div className="app">
      <Header />

      <main className="contenido">
        <h2>Bienvenido a Mi App de Viajes</h2>
      </main>

      <Footer />
    </div>
  )
}export default App
