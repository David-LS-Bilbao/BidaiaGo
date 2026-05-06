import "./styles/styles.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header'
import Footer from './components/Footer'
import TipsviajesPage from './pages/tipsviajesPage'

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Header />

        <main className="contenido">
          <Routes>
            <Route path="/" element={<h2>Bienvenido a Mi App de Viajes</h2>} />
            
            <Route path="/tipsviajes" element={<TipsviajesPage />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  )
}export default App
