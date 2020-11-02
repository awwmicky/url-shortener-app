const env = process.env.NODE_ENV || 'development';
const key = require('../config/knexfile.js')[env];
const connection = require('knex')(key);
const { Model } = require('objection');
Model.knex(connection)

const Link = require('./Link.js');

export default class User extends Model {
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
                    to: 'links.users_id'
                }
            }
        }
    }
}