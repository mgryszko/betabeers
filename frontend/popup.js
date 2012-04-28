var popup = function () {

    var backendURL = 'http://192.168.3.65:8080/torrent-server/torrentHub/search?bookTitle=';

    function appendBook(url, title) {
        var book = "<li><a href='" + url + "' target='blank'>" + title + "</a></li>";
        $("#books").append(book);
    }

    function getLinksFor(bookTitle) {
        $.getJSON(backendURL + bookTitle, function (data) {
            $.each(data.torrents, function (key, val) {
                appendBook(val.url, val.title);
            });
        });
    }

    var showBooks = function () {
        chrome.tabs.getSelected(null, function (tab) {
            var bookTitle = localStorage[tab.id];
            getLinksFor(bookTitle);
        });
    }

    return {
        showBooks:showBooks
    }
}();

popup.showBooks();