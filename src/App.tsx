import "./styles/styles.css";
import Header from './components/Header'
import Footer from './components/Footer'
import { Routes, Route } from "react-router-dom";
import AboutPage from "./pages/AboutPage";
import DestinationDetailPage from "./pages/DestinationDetailPage";
import HomePage from "./pages/HomePage";
import TripListPage from "./pages/TripListPage";
import LandingPage from "./pages/LandingPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";

function App() {
  return (
    <div className="app">
      <Header />

      <main className="contenido">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<HomePage />} />
          <Route path="/destinations/:id" element={<DestinationDetailPage />} />
          <Route path="/trip-list" element={<TripListPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="*" element={<h1>Página no encontrada</h1>} />
        </Routes>
      </main>

      <Footer />
    </div>
  )
}

export default App
