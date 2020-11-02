const env = process.env.NODE_ENV || 'development';
const key = require('../config/knexfile.js')[env];
const connection = require('knex')(key);
const { Model } = require('objection');
Model.knex(connection)

const User = require('./User.js');

export default class Link extends Model {
    static get tableName () {
        return 'links'
    }

    static get relationMappings () {
        return {
            users: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: 'links.users_id',
                    to: 'users.id'
                }
            }
        }
    }
}