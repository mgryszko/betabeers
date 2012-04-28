var scraper = function () {
    return {
        onAmazon: function() {
            return document.URL.indexOf('amazon.com') > -1;
        },
        isBookDisplayed: function() {
            return $("#btAsinTitle").length > 0;
        },
        findBookTitle: function() {
            return $("#btAsinTitle").text();
        }
    }
}();

if (scraper.onAmazon() && scraper.isBookDisplayed()) {
    chrome.extension.sendRequest({bookTitle: scraper.findBookTitle()});
}