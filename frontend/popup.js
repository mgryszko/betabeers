var popup = function () {

    var backendURL = 'http://192.168.3.65:8080/torrent-server/torrentHub/search?bookTitle=';
    var noBooksFoundMessage = 'No torrents were found for this book';

    function showNoBooksFoundMessage()
    {
        var message = "<li class='active'><a href='#' target='blank'>" + noBooksFoundMessage + "</a></li>";
        $("#books").append(message);
    }

    function appendBook(url, title) {
        var book = "<li><a href='" + url + "' target='blank'><i class='icon-circle-arrow-down'></i> " + title + "</a></li>";
        $("#books").append(book);
    }

    function getLinksFor(bookTitle) {
        $.getJSON(backendURL + bookTitle, function (data) {
            if (data.torrents.length == 0) {
                showNoBooksFoundMessage()
            }
            $.each(data.torrents, function (key, val) {
                appendBook(val.torrent.url, val.torrent.title);
            });
            $("#loading").hide();
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