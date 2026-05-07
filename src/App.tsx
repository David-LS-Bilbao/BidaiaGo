import "./styles/styles.css";
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header'
import Footer from './components/Footer'
import DestinationDetailPage from "./pages/DestinationDetailPage";
import HomePage from "./pages/HomePage";
import TripListPage from "./pages/TripListPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import ContactPage from "./pages/ContactPage";

function App() {
  return (
   
      <div className="app">
        <Header />

      <main className="contenido">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/destinations" element={<DestinationDetailPage />} />
          <Route path="/trip-list" element={<TripListPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<h1>Página no encontrada</h1>} />
        </Routes>
      </main>

        <Footer />
      </div>
   
  )
}export default App 
