// This is a service worker file

// Detect tab switching
chrome.tabs.onActivated.addListener(() => {
    chrome.storage.local.set({ healthSave: 0 });
});
