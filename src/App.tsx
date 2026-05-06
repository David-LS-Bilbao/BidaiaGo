import "./styles/styles.css";
import Header from './components/Header'
import Footer from './components/Footer'
import { Routes, Route } from "react-router-dom";
import AboutPage from "./pages/AboutPage";
import DestinationDetailPage from "./pages/DestinationDetailPage";
import HomePage from "./pages/HomePage";
import TripListPage from "./pages/TripListPage";
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
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          
        </Routes>
      </main>

      <Footer />
    </div>
  )
}export default App
