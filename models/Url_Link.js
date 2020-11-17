const { Model,connection } = require('../config/connection.js');
const { url_link } = require('../database/table-names.js');
Model.knex(connection)

module.exports = class Url_Link extends Model {
  static get tableName () {
    return url_link;
  }

  static get jsonSchema () {
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
  }
}