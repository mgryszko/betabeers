var bookTitle = 'X unit patterns';

function showBookLinks() {    
    $.getJSON('http://192.168.3.65:8080/torrent-server/torrentHub/index?bookTitle=' + bookTitle, function(data) {
      $.each(data.torrents, function(key, val) {
        appendBook(val.url, val.title);
      });
    });
}

function appendBook(url, title) {
  var item = document.createElement('li');
  var bookLink = document.createElement('a');
  bookLink.setAttribute('href', url);
  bookLink.setAttribute('target', "_blank");
  bookLink.appendChild(document.createTextNode(title));  
  item.appendChild(bookLink);
  document.getElementById('torrents').appendChild(item);  
}

showBookLinks();