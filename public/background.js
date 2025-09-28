// This is a service worker file

// Detect tab switching
chrome.tabs.onActivated.addListener(async () => {
    const result = await chrome.storage.local.get("creatureState");
    const creatureState = result.creatureState;

    if (creatureState === "focus" || creatureState === "egg") {
        await chrome.storage.local.set({ healthSave: 0 });
    }
});

chrome.alarms.onAlarm.addListener(async (alarm) => {
    try {
        const { creatureState } = await chrome.storage.local.get("creatureState");

        const newState = (creatureState === "focus") ? "alive" : "hatched";
        await chrome.storage.local.set({ creatureState: newState });

    } catch (error) {
        console.error("Failed to handle alarm:", error);
    }
});