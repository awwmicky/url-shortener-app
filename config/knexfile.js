// require("dotenv").config({ path:'../.env' })

module.exports = 
{
  "development": {
    "client": "pg",
    "connection": {
      "host"      :  process.env.DB_HOST_LOCAL,
      "user"      :  process.env.DB_USER_LOCAL,
      "password"  :  process.env.DB_PASS_LOCAL,
      "database"  :  process.env.DB_NAME_LOCAL 
    },
    "migrations" : { "directory": '../database/migrations/' },
    "seeds": { "directory": '../database/seeds/' }
  },

  "production": {
    "client": "pg",
    "connection": {
      "host"      :  process.env.DB_HOST_LIVE,
      "user"      :  process.env.DB_USER_LIVE,
      "password"  :  process.env.DB_PASS_LIVE,
      "database"  :  process.env.DB_NAME_LIVE 
    }
  },
  "migrations" : { "directory": '../database/migrations/' },
  "seeds": { "directory": '../database/seeds/' }
}