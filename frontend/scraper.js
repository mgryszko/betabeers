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

    $("#rcx-subs-bb, .primeEvent").remove();
    $("#addToCartUBBSpan").remove();
    $("#quantityDropdownDiv").remove();
    $("#oneClickDivId").remove();

    var skullImg = "<img id='searchBooks' width='100' src='http://lh6.ggpht.com/-fhG5DFn2aL0/Tyr7IB1zYWI/AAAAAAAARxk/t7pgfO5SeTk/Pirate%252520Party_thumb.png' />";
    $("#addToCartSpan").empty().append(skullImg);
}