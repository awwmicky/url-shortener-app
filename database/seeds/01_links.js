const { url_link } = require('../table-names.js');

exports.seed = (knex) => {
  return knex( url_link ).del().then(() => {
    return knex( url_link ).insert([
      { custom:"ge"  , domain:"google"       , url:"https://www.google.com/"       },
      { custom:"bg"  , domain:"bing"         , url:"https://www.bing.com/"         },
      { custom:"ddg" , domain:"duckduckgo"   , url:"https://www.duckduckgo.com/"   },
      { custom:"sy"  , domain:"search.yahoo" , url:"https://www.search.yahoo.com/" },
      { custom:"ea"  , domain:"ecosia"       , url:"https://www.ecosia.org/"       },
      { custom:"tt"  , domain:"torrent"      , url:"https://www.torrent.com/"      },
      { custom:"yt"  , domain:"youtube"      , url:"https://www.youtube.com/"      },
      { custom:"an"  , domain:"amazon"       , url:"https://www.amazon.com/"       }
    ])
  })
}