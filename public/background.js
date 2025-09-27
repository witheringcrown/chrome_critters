// This is a service worker file

//Lowkey don't think I need this anymore ngl
//But keeping it here just in case
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