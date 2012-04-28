var popup = function () {

  var backendURL = 'http://192.168.3.65:8080/torrent-server/torrentHub/index?bookTitle=';
  var bookTitle = 'X unit patterns';

  function appendBook(url, title) {
    var book = "<li><a href='" + url + "' target='blank'>" + title + "</a></li>";
    $("#books").append(book);  
  }

  var showBooks = function() {
    $.getJSON(backendURL + bookTitle, function(data) {
        alert(data);
        $.each(data.torrents, function(key, val) {            
            appendBook(val.url, val.title);
        });
    });
  }

  return {
      showBooks: showBooks
  }
}();

popup.showBooks();