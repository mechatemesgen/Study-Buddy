import { useState } from 'react'
import MainLogo from './assets/Logo.svg'

function App() {
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <img src={MainLogo} alt="Main Logo" />
      <h1 className="text-center">With this let the hackathon begin!</h1>
    </div>
  )
}

export default App
