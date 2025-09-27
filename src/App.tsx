import { useState } from 'react';
import './App.css'
import LilGuy from './lilguy'
import Namebar from './namebar'
import Timer from './timer'

function App() {
  const [health, setHealth] = useState(100);

  const lowerHealth = (amount = 10) => {
    setHealth(h => Math.max(0, h - amount));
  }

  return (
    <>
      <Namebar />
      <LilGuy health={health} onLowerHealth={lowerHealth} />
      <Timer />
    </>
  )
}

export default App
