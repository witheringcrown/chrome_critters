import { useEffect, useState } from 'react';
import './App.css'
import LilGuy from './lilguy'
import NameInput from './nameInput'
import Timer from './timer'
import Namebar from './namebar';

function App() {
  const [health, setHealth] = useState(100);
  const [creatureState, setCreatureState] = useState<'ready' | 'egg' | 'alive' | 'dead'>('ready');

  useEffect(() => {
    chrome.storage.local.get("healthSave", (data) => {
      if (data.healthSave !== undefined && data.healthSave !== null) {
        setHealth(data.healthSave);
        if (data.healthSave === 0) {
          setCreatureState('dead');
        }
      }
    });
    chrome.storage.local.get("creatureState", (data) => {
      if (data.creatureState !== undefined && data.creatureState !== null) {
        setCreatureState(data.creatureState);
      }
    });
    
  }, []);

  function lowerHealth(amount = 10) {
    const newHealth = Math.max(0, health - amount);
    setHealth(newHealth);
    if (newHealth === 0) {
      setCreatureState('dead');
      chrome.storage.local.set({ creatureState: 'dead' });
    }
    chrome.storage.local.set({ healthSave: newHealth });
  }


  const handleNameChange = (newName: string) => {
    chrome.storage.local.set({ creatureName: newName });
  };

  if (creatureState === 'ready') {
    return (
      <>
        <NameInput onNameChange={handleNameChange}/> 
        <Namebar />
        <LilGuy onLowerHealth={lowerHealth} creatureState={creatureState}/>
        <button onClick={() => setCreatureState('egg')}>Go to egg</button>
      </>
    );
  }
  else if (creatureState === 'egg') {

    return (
    <>
      <Namebar />
      <LilGuy onLowerHealth={lowerHealth} creatureState={creatureState}/>
      <Timer />
      <button onClick={() => setCreatureState('alive')}>Go to alive</button>
    </>
  )
  }
  else if (creatureState === 'alive') {
    return (
    <>
      <Namebar />
      <LilGuy onLowerHealth={lowerHealth} creatureState={creatureState}/>
      <Timer />
      <button onClick={() => setCreatureState('dead')}>Go to dead</button>

    </>
  )
  }
  else { //Dead
    return (
      <>
        <Namebar />
        <LilGuy onLowerHealth={lowerHealth} creatureState={creatureState}/>
        <button onClick={() => setCreatureState('ready')}>Go to ready</button>
      </>
    );
  }
  
}

export default App
