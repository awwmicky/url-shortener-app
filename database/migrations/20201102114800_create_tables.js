exports.up = (knex) => {
  return Promise.all([
    knex.schema.createTable('links', (table) => {
      table.increments('id').primary();

      table.string('custom', 30).notNullable();
      table.string('link', 255).notNullable();
      table.integer('count').notNullable().defaultTo(0);

      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    })
  ])
}

exports.down = (knex) => {
  return Promise.all([
    knex.schema.dropTableIfExists('links')
  ])
}