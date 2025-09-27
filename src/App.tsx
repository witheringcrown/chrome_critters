import { useEffect, useState } from 'react';
import './App.css'
import LilGuy from './lilguy'
import Namebar from './namebar'
import Timer from './timer'

function App() {
  const [health, setHealth] = useState(100);

  useEffect(() => {
    chrome.storage.local.get("healthSave", (data) => {
      if (data.healthSave !== undefined && data.healthSave !== null) {
        setHealth(data.healthSave);
      }
    });
  }, []);

  const lowerHealth = (amount = 10) => {
    const newHealth = Math.max(0, health - amount);
    setHealth(newHealth);
    chrome.storage.local.set({ healthSave: newHealth });
  }

  return (
    <>
      <Namebar />
      <LilGuy health={health} onLowerHealth={lowerHealth} setHealth={setHealth} />
      <Timer />
    </>
  )
}

export default App
