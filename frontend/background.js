function onAmazon(tab) {
    return tab.url.indexOf('amazon') > -1;
}

function checkForValidUrl(tabId, changeInfo, tab) {
    if (onAmazon(tab)) {
        chrome.pageAction.show(tabId);
    }
}

chrome.tabs.onUpdated.addListener(checkForValidUrl);
