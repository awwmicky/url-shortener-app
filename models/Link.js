const { Model,connection } = require('../config/connection.js');
Model.knex(connection)

module.exports = class Link extends Model {
    static get tableName () {
        return 'links'
    }

    static get jsonSchema() {
        return {
          type: 'object',
          properties: {
            id:      { type : 'integer' },
            custom:  { type : 'string'  },
            domain:  { type : 'string'  },
            url:     { type : 'string'  },
            checked: { type : 'boolean' },
            count:   { type : 'integer' }
          }
        };
    }d
    // ! check if schema works
}