const { Model,connection } = require('../config/connection.js');
Model.knex(connection)

module.exports = class Link extends Model {
    static get tableName () {
        return 'links'
    }

    // ! add validation check DB
}