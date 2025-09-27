import { useEffect, useState } from 'react';
import './App.css'
import LilGuy from './lilguy'
import Namebar from './namebar'
import Timer from './timer'

function App() {
  const [health, setHealth] = useState(100);
  const [creatureState, setCreatureState] = useState<'ready' | 'egg' | 'alive' | 'dead'>('ready');

  useEffect(() => {
    chrome.storage.local.get("healthSave", (data) => {
      if (data.healthSave !== undefined && data.healthSave !== null) {
        setHealth(data.healthSave);
      }
    });
    chrome.storage.local.get("creatureState", (data) => {
      if (data.creatureState !== undefined && data.creatureState !== null) {
        setCreatureState(data.creatureState);
      }
    });
  }, []);

  const lowerHealth = (amount = 10) => {
    const newHealth = Math.max(0, health - amount);
    setHealth(newHealth);
    if (newHealth === 0) {
      setCreatureState('dead');
      chrome.storage.local.set({ creatureState: 'dead' });
    }
    chrome.storage.local.set({ healthSave: newHealth });
  }

  return (
    <>
      <Namebar />
      <LilGuy health={health} onLowerHealth={lowerHealth} creatureState={creatureState}/>
      
      <Timer />
    </>
  )
}

export default App
