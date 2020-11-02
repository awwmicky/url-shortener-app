const { Model,connection } = require('../config/connection.js');
Model.knex(connection)

const Link = require('./Link.js');

module.exports = class User extends Model {
    static get tableName () {
        return 'users'
    }

    static get relationMappings () {
        return {
            links: {
                relation: Model.HasManyRelation,
                modelClass: Link,
                join: {
                    from: 'users.id',
                    to: 'links.user_id'
                }
            }
        }
    }
}