package betabeers

import groovy.json.*


class TorrentHubController {

    def index() {
        def json = new JsonBuilder()
        json.torrents {
            torrent {
                title 'Neuro-Linguistic Programming'
                link 'http://www.mnova.eu/rss/download/torrent/211231/2008-07-13/0a403d196cb8cef927fdc5231e3a5b014d562b98/e61c8b69242a8634f63fbc9717d47519/Neuro-Linguistic_Programming_-_NLP_eBook_(www.softzone.org).torrent'
            }
        }
        render json.toString()
    }

}
 