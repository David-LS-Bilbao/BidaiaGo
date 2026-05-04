import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'

function App() {
  const [count, setCount] = useState(0)

  return (
     <div>
      <Header />






        <main>
          <h2>Bienvenido a Mi App de Viajes</h2>
        </main>



       <Footer />
    </div>

  )
}

export default App
