exports.seed = (knex) => {
  return knex('links').del().then(() => {
    return knex('links').insert([
      { name:"ge"  , link:"https://www.google.com/"       , user_id:1 },
      { name:"bg"  , link:"https://www.bing.com/"         , user_id:1 },
      { name:"ddg" , link:"https://www.duckduckgo.com/"   , user_id:2 },
      { name:"sy"  , link:"https://www.search.yahoo.com/" , user_id:3 },
      { name:"ea"  , link:"https://www.ecosia.org/"       , user_id:4 },
      { name:"tt"  , link:"https://www.torrent.com/"      , user_id:4 },
      { name:"yt"  , link:"https://www.youtube.com/"      , user_id:4 },
      { name:"an"  , link:"https://www.amazon.com/"       , user_id:5 }
    ])
  })
}