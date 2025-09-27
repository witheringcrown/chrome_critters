// This is a service worker file

chrome.runtime.onMessage.addListener(data => {
    switch(data.event) {
        case "onSwitch":
            console.log("He's Dead!");
            break;
        
    }
});