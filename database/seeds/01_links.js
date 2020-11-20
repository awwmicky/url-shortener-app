const { url_link } = require('../table-names.js');


exports.seed = (knex) => {
  return knex( url_link ).del().then(() => {
    return knex( url_link ).insert([
      { domain:"google"     , url:"https://www.google.com/"     },
      { domain:"bing"       , url:"https://www.bing.com/"       },
      { domain:"duckduckgo" , url:"https://www.duckduckgo.com/" },
      { domain:"yahoo"      , url:"https://search.yahoo.com/"   },
      { domain:"ecosia"     , url:"https://www.ecosia.org/"     },
      { domain:"torrent"    , url:"https://www.torrent.com/"    },
      { domain:"youtube"    , url:"https://www.youtube.com/"    },
      { domain:"amazon"     , url:"https://www.amazon.com/"     }
    ])
  })
}