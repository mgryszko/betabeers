var scraper = function () {
    var onAmazon = function () {
        return document.URL.indexOf('amazon.com') > -1;
    };

    var isBookDisplayed = function () {
        return $("#btAsinTitle").length > 0;
    }

    var findBookTitle = function () {
        var title = extractBookTitle();
        title = removeBrackets(stripAfterComma(stripAfterColon(title)));
        return title;
    }

    function extractBookTitle() {
        return $.trim($("#btAsinTitle").text());
    }

    function stripAfterComma(title) {
        var parsedTitle = title.replace(/(,.*)?/g, "");
        return $.trim(parsedTitle);
    }

    function stripAfterColon(title) {
        var parsedTitle = title.replace(/(:.*)?/g, "");
        return $.trim(parsedTitle);
    }

    function removeBrackets(title) {
        var parsedTitle = title.replace(/\[.*\]/g, "").replace(/\(.*\)/g, "");
        return $.trim(parsedTitle);
    }

    return {
        onAmazon:onAmazon,
        isBookDisplayed:isBookDisplayed,
        findBookTitle:findBookTitle
    }
}();

if (scraper.onAmazon() && scraper.isBookDisplayed()) {
    chrome.extension.sendRequest({bookTitle:scraper.findBookTitle()});
}