import { Link } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import { IfAuthenticated, IfNotAuthenticated } from '../utilities/Authenticated'

function Login() {
  const { user, logout, loginWithRedirect } = useAuth0()

  const handleSignOut = () => logout()
  const handleSignIn = () => loginWithRedirect()

  return (
    <div className="w-80 space-y-6 rounded-2xl bg-white/5 p-10 text-center shadow-xl">
      <h1 className="text-2xl font-bold text-white">Login Page</h1>

      {/* Auth Section */}
      <div className="space-y-4">
        <IfAuthenticated>
          <div className="space-y-2 text-white">
            <button
              onClick={handleSignOut}
              className="w-full rounded-xl bg-red-600 py-2 font-semibold text-white transition-all hover:bg-red-700"
            >
              Sign out
            </button>
            {user && (
              <div className="flex flex-col items-center">
                <img
                  src={user?.picture}
                  alt={user?.given_name}
                  referrerPolicy="no-referrer"
                  className="h-16 w-16 rounded-full object-cover"
                />
                <p className="text-sm">Signed in as: {user?.nickname}</p>
              </div>
            )}
          </div>
        </IfAuthenticated>

        <IfNotAuthenticated>
          <button
            onClick={handleSignIn}
            className="w-full rounded-xl bg-blue-600 py-2 font-semibold text-white transition-all hover:bg-blue-700"
          >
            Sign in
          </button>
        </IfNotAuthenticated>
      </div>

      {/* Navigation Links */}
      <ul className="space-y-4">
        <li>
          <Link
            to="/game"
            className="block w-full rounded-xl bg-green-500 py-3 font-semibold text-white transition-all hover:bg-green-600"
          >
            Start Game
          </Link>
        </li>
        <li>
          <Link
            to="/gamelog"
            className="block w-full rounded-xl bg-purple-500 py-3 font-semibold text-white transition-all hover:bg-purple-600"
          >
            Game Log
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default Login
