/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable('gameslog', (table) => {
    table.increments('id').primary()
    table.integer('user_id')
    table.boolean('status')
    table.integer('question_used')
    table.integer('hint_used')
    table.string('ai_answer')
    table.string('question_text')
    table.string('ai_response')
    table.timestamp('created_at')
  })
}

export function down(knex) {
  return knex.schema.dropTable('gameslog')
}
