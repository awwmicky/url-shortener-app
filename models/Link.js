const { Model,connection } = require('../config/connection.js');
Model.knex(connection)

const User = require('./User.js');

module.exports = class Link extends Model {
    static get tableName () {
        return 'links'
    }

    static get relationMappings () {
        return {
            users: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: 'links.user_id',
                    to: 'users.id'
                }
            }
        }
    }
}