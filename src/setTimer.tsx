import { useState } from 'react';

type SetTimerProps = {
    handleSetTimer: () => void;
};

function SetTimer({ handleSetTimer }: SetTimerProps) {
    const [time, setTime] = useState(15 * 60); // 15 minutes in seconds

    // calculate time
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    // Method to start and stop timer
    const startFocus = () => {
        startAlarm((time + 59) / 60); // Round up to the nearest minute
        handleSetTimer();
    };
    const addFiveMinutes = () => {
        setTime(time + 1); //5 * 60
    };
    const subFiveMinutes = () => {
        setTime(Math.max(0, time - 5 * 60));
    };

    // Function to start Chrome alarm
    async function startAlarm(minutes: number) {
        try {
            const alarm = await chrome.alarms.get("focusAlarm");

            if (!alarm) {
                await chrome.alarms.create("focusAlarm", { delayInMinutes: (time / 60)});
            } else {
                // Reset it anyway
                await chrome.alarms.clear("focusAlarm");
                await chrome.alarms.create("focusAlarm", { delayInMinutes: (time / 60)});
            }
            console.log("Alarm set for", (time / 60), "minutes");

            await chrome.storage.local.set({ focusEndTime: minutes * 60 * 1000 + Date.now() });
        } catch (err) {
            console.error("Failed to start or update alarm:", err);
        };
    }

    return (
         <div className="timer-container">
            <p className="timer-time">
                {hours}:{minutes.toString().padStart(2, "0")}:
                {seconds.toString().padStart(2, "0")}
            </p>
            <div className="stopwatch-buttons">
                <button className="stopwatch-button" onClick={subFiveMinutes}>
                    -5 minutes
                </button>
                <button className="stopwatch-button" onClick={startFocus} disabled={time === 0}>
                    Focus on This Tab
                </button>
                <button className="stopwatch-button" onClick={addFiveMinutes}>
                    +5 minutes
                </button>
            </div>
        </div>
    );
}

export default SetTimer