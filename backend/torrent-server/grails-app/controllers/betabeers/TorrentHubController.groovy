package betabeers

import grails.converters.JSON


class TorrentHubController {

    def index() {
        def term = params.bookTitle ?: 'programming'
        def url = "http://www.mnova.eu/rss.php?search=$term".toURL()
        def xml = new XmlSlurper().parseText(url.text)  // new XmlParser().parseText(url.text)

        def allItems = xml.channel.item  // 50 results by default
        def torrents = allItems.inject([]) { list, item ->
            list << new Torrent(title: item.title, url: item.enclosure.'@url')
        }

        torrents = torrents[0]  // Restring to N results with a range (0..N-1)
        def torrentList = torrents.collect { torrent -> [torrent: [title: torrent.title, url: torrent.url]] }
        torrentList = ['torrents': torrentList]
        render torrentList as JSON
    }

}


class Torrent {
    String title
    String url

    String toString() {
        """Title: $title
          |URL: $url""".stripMargin()
    }
}
