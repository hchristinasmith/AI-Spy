## AI-spy: An Interactive 20 Questions Game

AI-spy is an interactive web application that puts a modern twist on the classic "I spy" and "20 Questions" games. Using Google's Gemini AI, the application creates an engaging experience where players can try to guess what the AI is thinking of within a specified topic.

## Features

- **Topic Selection**: Choose any topic for the AI to select an item from
- **Difficulty Levels**: Select from easy, medium, or hard difficulty settings
- **Interactive Gameplay**: Ask yes/no questions to narrow down your guesses
- **Hint System**: Request up to 3 hints when you're stuck
- **Game Statistics**: Track your performance with stats on questions asked, hints used, and win/loss records
- **Game History**: Review your past games and performance

## Tech Stack

- **Frontend**: React with TypeScript, TailwindCSS
- **Backend**: Express.js with TypeScript
- **Authentication**: Auth0
- **AI Integration**: Google Gemini API
- **Database**: SQLite with Knex.js
- **Testing**: Vitest and Testing Library

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Google Gemini API key

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/AI-spy.git
   cd AI-spy
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory with your Google Gemini API key:
   ```
   GOOGLE_API_KEY=your_api_key_here
   ```

4. Set up the database:
   ```
   npm run knex migrate:latest
   npm run knex seed:run
   ```

5. Start the development server:
   ```
   npm run dev
   ```

6. Open your browser and navigate to:
   - Frontend: [http://localhost:5173](http://localhost:5173)
   - Backend API: [http://localhost:3000](http://localhost:3000)

## How to Play

1. **Start a New Game**:
   - Choose a topic (e.g., "animals", "countries", "movies")
   - Select a difficulty level
   - Click "Start Game"

2. **Ask Questions**:
   - Type yes/no questions to narrow down what the AI is thinking of
   - You have a maximum of 20 questions per game
   - Use up to 3 hints if you get stuck

3. **Make Your Guess**:
   - When you think you know the answer, type it in
   - If correct, you win!
   - If you run out of questions or give up, the AI reveals the answer

## Acknowledgments

- Google Gemini API for powering the AI interactions
- Dev Academy for the project foundation