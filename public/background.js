// This is a service worker file

// Detect tab switching
chrome.tabs.onActivated.addListener(() => {
    chrome.storage.local.set({ healthSave: 0 });
});

chrome.alarms.onAlarm.addListener(async (alarm) => {
    if (alarm.name === "focusAlarm") {
        console.log("Focus alarm triggered");
    }
});