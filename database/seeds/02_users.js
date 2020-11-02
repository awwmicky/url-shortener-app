exports.seed = (knex) => {
  return knex('users').del().then(() => {
    return knex('users').insert([
      { username:"king"  , link_id:1 },
      { username:"queen" , link_id:2 },
      { username:"jack"  , link_id:3 }
    ])
  })
}