/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments('id')
    table.string('username')
  })
}

export async function down(knex) {
  return knex.schema.dropTable('users')
}
