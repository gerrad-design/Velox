import React from 'react';
import { useState } from 'react'
import './App.css'
import Authentication from './components/Authentication';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Authentication />
    </div>
  )
}

export default App
