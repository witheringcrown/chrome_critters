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
    const result = await chrome.storage.local.get("creatureState");
    const creatureState = result.creatureState;

    if (creatureState === "focus") {
        await chrome.storage.local.set({ creatureState: "alive" });
    }
    else {
        await chrome.storage.local.set({ creatureState: "hatched" });
    }
});