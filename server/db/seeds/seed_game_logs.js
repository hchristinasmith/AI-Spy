export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('gameslog').del()

  // Inserts seed entries
  await knex('gameslog').insert([
    {
      user_id: 1,
      status: true,
      question_used: 3,
      hint_used: 1,
      ai_answer: 'Blue horse',
      question_text: 'What is the largest animal?',
      ai_response: 'Correct!',
    },
    {
      user_id: 2,
      status: false,
      question_used: 1,
      hint_used: 0,
      ai_answer: 'Giraffe',
      question_text: 'Tallest animal?',
      ai_response: 'Incorrect',
    },
    {
      user_id: 3,
      status: false,
      question_used: 1,
      hint_used: 0,
      ai_answer: 'Giraffe',
      question_text: 'Tallest animal?',
      ai_response: 'Incorrect',
    },
  ])
}
