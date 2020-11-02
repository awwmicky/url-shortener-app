exports.seed = (knex) => {
  return knex('users').del().then(() => {
    return knex('users').insert([
      { username:"king"    },
      { username:"queen"   },
      { username:"jack"    },
      { username:"ace"     },
      { username:"joker"   },
      // { username:"club"    },
      // { username:"heart"   },
      // { username:"spade"   },
      // { username:"diamond" }
    ])
  })
}