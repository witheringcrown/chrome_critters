import { useState, useEffect } from "react";

export default function Timer() {
    const [time, setTime] = useState(15 * 60); // 15 minutes in seconds
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        let interval: number | undefined;

    if (isActive && time > 0) {
      interval = window.setInterval(() => {
        setTime((prev) => prev - 1);
      }, 1000);
    }
        if (isActive && time > 0) {
        interval = window.setInterval(() => {
            setTime((prev) => prev - 1);
        }, 1000);
        }

        return () => clearInterval(interval);
    }, [isActive, time])
    
    useEffect(() => {
    if (!isActive) return;

    const listener = (message: any) => {
        if (message.event === "TAB_SWITCHED") {
            //Do smthing when tab is switched
        }
    };

    chrome.runtime.onMessage.addListener(listener);

    // Cleanup
    return () => {
      chrome.runtime.onMessage.removeListener(listener);
    };
  }, [isActive]);

    // calculate time
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    // Method to start and stop timer
    const startAndStop = () => {
        setIsActive(!isActive);
    };
    const reset = () => {
       setTime(15 * 60);
       setIsActive(false);
    };
    const addFiveMinutes = () => {
        setTime(time + 5 * 60);
    };
    const subFiveMinutes = () => {
        setTime(Math.max(0, time - 5 * 60));
    };

    return (
        <div className="timer-container">
            <p className="timer-time">
                {hours}:{minutes.toString().padStart(2, "0")}:
                {seconds.toString().padStart(2, "0")}:
            </p>
            <div className="stopwatch-buttons">
                <button className="stopwatch-button" onClick={subFiveMinutes}>
                -5 minutes
                </button>
                <button className="stopwatch-button" onClick={startAndStop}>
                {isActive ? "Stop Focusing" : "Focus"}
                </button>
                <button className="stopwatch-button" onClick={addFiveMinutes}>
                +5 minutes
                </button>
                <button className="stopwatch-button" onClick={reset}>
                Reset
                </button>
            </div>
            </div>
        );
}