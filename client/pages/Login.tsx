import { Link } from 'react-router-dom'

function Login() {
  return (
    <>
      <div className="app">
        <h1>Login Page</h1>
      </div>
      <ul>
        <Link to="/game">
          <li>Start Game</li>
        </Link>
        <Link to="/gamelog">
          <li>Game Log</li>
        </Link>
      </ul>
    </>
  )
}

export default Login
