exports.seed = (knex) => {
  return knex('links').del().then(() => {
    return knex('links').insert([
      { custom:"ge"  , link:"https://www.google.com/"       },
      { custom:"bg"  , link:"https://www.bing.com/"         },
      { custom:"ddg" , link:"https://www.duckduckgo.com/"   },
      { custom:"sy"  , link:"https://www.search.yahoo.com/" },
      { custom:"ea"  , link:"https://www.ecosia.org/"       },
      { custom:"tt"  , link:"https://www.torrent.com/"      },
      { custom:"yt"  , link:"https://www.youtube.com/"      },
      { custom:"an"  , link:"https://www.amazon.com/"       }
    ])
  })
}