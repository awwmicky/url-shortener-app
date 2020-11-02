exports.seed = (knex) => {
  return knex('links').del().then(() => {
    return knex('links').insert([
      { name:"ge" , link:"https://www.google.com/" },
      { name:"bg" , link:"https://www.bing.com/" },
      { name:"do" , link:"https://www.duckduckgo.com/" }
    ])
  })
}