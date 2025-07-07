export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('users').del()

  // Inserts seed entries
  await knex('users').insert([
    { id: 1, username: 'Eugene' },
    { id: 2, username: 'Kevinn' },
    { id: 3, username: 'Hannah' },
  ])
}
