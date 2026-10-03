import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import Hero from './components/hero.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>  
    <div className='flex flex-col items-center justify-center w-full h-screen bg-black text-white'>
    <Hero />

    </div>
    
    </>
  )
}

export default App
