import { useEffect, useState } from 'react';
import './App.css'
import LilGuy from './lilguy'
import NameInput from './nameInput'
import Timer from './timer'
import Namebar from './namebar';
import SetTimer from './setTimer';
import Failed from './failed';

function App() {
  const [name, setName] = useState('');
  const [creatureState, setCreatureState] = useState<'ready' | 'egg' | 'hatched' | 'alive' | 'focus' | 'dead'> ('hatched');

  useEffect(() => {
    chrome.storage.local.get("healthSave", (data) => {
      if (data.healthSave !== undefined && data.healthSave !== null) {
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

  // We don't need this rn but we may later?
  // function lowerHealth(amount = 10) {
  //   const newHealth = Math.max(0, health - amount);
  //   setHealth(newHealth);
  //   if (newHealth === 0) {
  //     setCreatureState('dead');
  //     chrome.storage.local.set({ creatureState: 'dead' });
  //   }
  //   chrome.storage.local.set({ healthSave: newHealth });
  // }


  const handleNameChange = (newName: string) => {
    setName(newName);
    setCreatureState('alive');
    chrome.storage.local.set({ creatureName: newName });
    chrome.storage.local.set({ creatureState: 'alive' });
  };

  return (
    <>
      {creatureState === 'hatched' ? <NameInput onNameChange={handleNameChange}/> : <Namebar name={name}/>}
      <LilGuy imageState={creatureState === 'dead' ? 'dead' : creatureState === 'ready' || creatureState === 'egg' ? 'egg' : 'mon'}/>
      {creatureState === 'ready' || creatureState === 'alive' ? <SetTimer /> : null}
      {creatureState === 'focus' || creatureState === 'egg' ? <Timer /> : null}
      {creatureState === 'dead' ? <Failed /> : null}
    </>
  );
  
}

export default App
