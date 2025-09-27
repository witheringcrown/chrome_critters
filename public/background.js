// This is a service worker file

chrome.runtime.onMessage.addListener(data => {
    switch(data.event) {
        case "onSwitch":
            handleOnSwitch(data.prefs);
            break;
        default:
            break;
    }
});

function handleOnSwitch(prefs) {
    console.log(prefs);
    chrome.storage.local.set(prefs);
}