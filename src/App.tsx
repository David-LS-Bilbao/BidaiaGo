import "./styles/styles.css";
import Header from './components/Header'
import Footer from './components/Footer'
import { Routes, Route } from "react-router-dom";
import AboutPage from "./pages/AboutPage";
import DestinationDetailPage from "./pages/DestinationDetailPage";
import HomePage from "./pages/HomePage";      
import TripListPage from "./pages/TripListPage";
import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <div className="app">
      <Header />

      <main className="contenido">
        <h2>Bienvenido a Mi App de Viajes</h2>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/destinations" element={<DestinationDetailPage />} />
          <Route path="/trip-list" element={<TripListPage />} />
          <Route path="/about" element={<AboutPage />} />
          
        </Routes>
      </main>

      <Footer />
    </div>
  )
}export default App
