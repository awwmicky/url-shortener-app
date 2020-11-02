exports.up = (knex) => {
  return Promise.all([
    knex.schema.createTable('links', (table) => {
      table.increments('id').primary().notNullable();

      table.string('name', 50).notNullable();
      table.string('link', 255).notNullable();

      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());

      // table.integer('user_id').reference('users.id').inTable('users');
      // table.bigInteger('user_id').unsigned().notNullable().index()
      // .references('id').inTable('users').onDelete('CASCADE');
    }),

    knex.schema.createTable('users', (table) => {
      table.increments('id').primary().notNullable();
      
      table.string('username', 20).notNullable().defaultTo('anonymous');

      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());

      // table.integer('link_id').reference('links.id').inTable('links');
      table.bigInteger('link_id').unsigned().notNullable().index()
      .references('id').inTable('links').onDelete('CASCADE');
    })
  ])
}

exports.down = (knex) => {
  return Promise.all([
    knex.schema.dropTableIfExists('users'),
    knex.schema.dropTableIfExists('links')
  ])
}