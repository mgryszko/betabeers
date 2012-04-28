package betabeers

import grails.converters.JSON


class TorrentHubController {

    def search() {
        def term = params.bookTitle
        def url = "http://www.mnova.eu/rss.php?search=$term".toURL()

        def torrentList = [torrents: []]

        if (url.text != 'No torrents where found!')
        {
            def xml = new XmlSlurper().parseText(url.text)
            def allItems = xml.channel.item  // 50 results by default
            def torrents = allItems.inject([]) { list, item ->
                list << new Torrent(title: item.title, url: item.enclosure.'@url')
            }

            def range = (0..4)  // Restring to N results with a range (0..N-1)
            torrentList.torrents = torrents[range].collect { torrent -> [torrent: [title: torrent.title, url: torrent.url]] }
        }

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
