import { useState, useEffect } from "react";

type TimerProps = {
    passedTime?: number;
};

// Timer component
function Timer({ passedTime }: TimerProps) {
    const [time, setTime] = useState(passedTime || 0);

    // Check alarm state and create alarm if enabled
    useEffect(() => {
        syncWithAlarm();

    }, []); 

    // Decrease timer every second
    useEffect(() => {
        if (time <= 0) return;

        const interval = setInterval(() => {
            setTime(prev => prev - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [time]);

    // Function to start Chrome alarm
    async function syncWithAlarm() {
        chrome.alarms.get("focusAlarm", function(alarm) {
            if (alarm) {
                const currentTime = Date.now();
                const scheduledTime = alarm.scheduledTime;
                const remainingTimeMs = scheduledTime - currentTime;
                setTime(Math.max(0, Math.floor(remainingTimeMs / 1000)));
            } else {
                console.log("No alarm found, creating one.");                
            }
        });
    }

    // Calculate time
    const hours = Math.floor(time / 3600);
    const mins = Math.floor((time % 3600) / 60);
    const secs = time % 60;

    return (
        <div className="timer-container">
            <p className="timer-time">
                {hours}:{mins.toString().padStart(2, "0")}:
                {secs.toString().padStart(2, "0")}
            </p>
        </div>
    );
}

export default Timer;