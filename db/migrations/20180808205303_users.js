exports.up = knex =>
  knex.schema.createTable('users', table => {
    table
      .bigIncrements('id')
      .primary()
    table
      .specificType('username', 'char(20)')
      .unique()
    table
      .string('email')
      .notNullable()
      .unique()
    table.string('hashed_password').notNullable()
    table.string('bio').defaultTo('')
    table.string('image').defaultTo('')
    table.datetime('createdAt').defaultTo(knex.fn.now())
    table.datetime('updatedAt').defaultTo(knex.fn.now())
  })

exports.down = knex => knex.schema.dropTableIfExists('users')
