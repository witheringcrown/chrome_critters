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
  const [creatureState, setCreatureState] = useState<'ready' | 'egg' | 'scrambled' | 'hatched' | 'alive' | 'focus' | 'dead'> ('ready');
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const possibleTints = [
    "#ffffff",
    "#ff004d",
    "#ffa300",
    "#ffec27",
    "#00e436",
    "#29adff",
    "#83769c",
    "#ff77a8"
  ];
  const [totalTime, setTotalTime] = useState<number>(0);

  const [tint, setTint] = useState<string>(possibleTints[0]);

  function getRandomTint() {
    const randomIndex = Math.floor(Math.random() * possibleTints.length);
    return possibleTints[randomIndex];
  }

  useEffect(() => {

    function onStorageChange(changes: any, area: string) {
      if (area === 'local' && changes.creatureState) {
        setCreatureState(changes.creatureState.newValue);
        if (changes.creatureState.newValue === 'hatched') {
          const newTint = getRandomTint();
          setTint(newTint);
          chrome.storage.local.set({ tint: newTint });
        }
      }
    };

    chrome.storage.onChanged.addListener(onStorageChange);

    chrome.storage.local.get("tint", (data) => {
      if (data.tint !== undefined && data.tint !== null) {
        setTint(data.tint);
      }
    });

    chrome.storage.local.get("creatureState", (data) => {
      if (data.creatureState !== undefined && data.creatureState !== null) {
        setCreatureState(data.creatureState);
      }
    });

    chrome.storage.local.get("totalTime", (data) => {
      if (data.totalTime !== undefined && data.totalTime !== null) {
        setTotalTime(data.totalTime);
      }
    });

    chrome.storage.local.get("healthSave", (data) => {
      chrome.storage.local.get("creatureState", (state) => {
      if (data.healthSave !== undefined && data.healthSave !== null) {
          if (data.healthSave === 0) {
            chrome.alarms.clearAll();
            if (state.creatureState === 'focus') {
              setCreatureState('dead');
            } else {
              setCreatureState('scrambled');
            }
          }
        }
      });
    });

    chrome.storage.local.get("creatureName", (data) => {
      if (data.creatureName !== undefined && data.creatureName !== null) {
        setName(data.creatureName);
      }
    });
    
  }, []);

  // Update total time
  useEffect(() => {
    let interval: number | undefined;

    if (creatureState === "focus") {
      interval = window.setInterval(() => {
        setTotalTime(prev => {
          const updated = prev + 1;
          chrome.storage.local.set({ totalTime: updated });
          return updated;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [creatureState]);


  const handleNameChange = (newName: string) => {
    setName(newName);
    setCreatureState('alive');
    chrome.storage.local.set({ creatureName: newName });
    chrome.storage.local.set({ creatureState: 'alive' });
  };

  async function restart() {
    setCreatureState('ready');
    setName('');
    setTint(possibleTints[0]);
    setTotalTime(0);

    await chrome.storage.local.set({ tint: possibleTints[0] });
    await chrome.storage.local.set({ creatureState: 'ready' });
    await chrome.storage.local.set({ healthSave: 100 });
    await chrome.storage.local.set({ totalTime: 0 });
    await chrome.storage.local.remove('creatureName');
  }

  async function handleSetTimer() {
    const focusAlarm = await chrome.alarms.get("focusAlarm");
    const currentTime = Date.now();
    const scheduledTime = focusAlarm?.scheduledTime || 0;
    const remainingTimeMs = scheduledTime - currentTime;
    const newTimeLeft = Math.max(0, Math.floor(remainingTimeMs / 1000));

    setTimeLeft(newTimeLeft); // update the state here

    if (creatureState === 'ready'){
      setCreatureState('egg');
      chrome.storage.local.set({ creatureState: 'egg' });
      return;
    }
    setCreatureState('focus');
    chrome.storage.local.set({ creatureState: 'focus' });
  }

  return (
    <>
      {creatureState === 'hatched' ? <NameInput onNameChange={handleNameChange}/> : name === '' ? null : <Namebar name={name}/>}
      <LilGuy imageState={creatureState === 'dead' ? 'dead' : creatureState === 'ready' || creatureState === 'egg' ? 'egg' : creatureState === 'scrambled' ? 'scrambled' : 'mon'}
        tint={tint}/>
      {creatureState === 'ready' || creatureState === 'alive' ? <SetTimer handleSetTimer={handleSetTimer}/> : null}
      {creatureState === 'focus' || creatureState === 'egg' ? <Timer passedTime={timeLeft} /> : null}
      {creatureState === 'dead' || creatureState === 'scrambled' ? <Failed startOver={restart}/> : null}
      {(creatureState === 'alive' || creatureState === 'dead') && (<div className="total-time">Total Focus Time: {totalTime} seconds</div>)}
    </>
  );
  
}

export default App