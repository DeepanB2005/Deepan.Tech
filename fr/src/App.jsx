import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import Hero from './components/hero.jsx'
import PillNav from './components/nav.jsx'
import logo from './assets/react.svg'

function App() {
  const [count, setCount] = useState(0)
  const location = useLocation()

  return (
    <>  
    <div className='relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-black text-white'>

      <PillNav
        logo={logo}
        logoAlt="Company Logo"
        items={[
          { label: 'Projects', href: '/projects' },
          { label: 'About', href: '/about' },
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: 'Contact', href: '/contact' }
        ]}
        activeHref={location.pathname}
      />

      <Hero />
    </div>
    
    </>
  )
}

export default App
