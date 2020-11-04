const TABLE = 'url_link';

const timeStamps = (table, knex) => {
  table.timestamp('created_at').defaultTo(knex.fn.now());
  table.timestamp('updated_at').defaultTo(knex.fn.now());
};

exports.up = (knex) => {
  return Promise.all([
    knex.schema.createTable(TABLE, (table) => {
      table.increments('id').primary();

      table.string('custom', 30).notNullable();
      table.string('domain', 255).notNullable();
      table.string('url', 255).notNullable();
      table.boolean('checked').notNullable().defaultTo(false);
      table.integer('count').notNullable().defaultTo(0);

      timeStamps(table, knex)
    })
  ])
}

exports.down = (knex) => {
  return Promise.all([
    knex.schema.dropTableIfExists(TABLE)
  ])
}