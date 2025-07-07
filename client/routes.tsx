import { createRoutesFromElements, Route } from 'react-router-dom'
//import App from './components/App.tsx'

import Layout from './pages/Layout.tsx'
import Login from './pages/Login.tsx'
import GameLog from './pages/GameLog.tsx'
import Game from './pages/Game.tsx'
const routes = createRoutesFromElements(
  <Route element={<Layout />}>
    <Route path="/" element={<Login />} />
    <Route path="/game" element={<Game />} />
    <Route path="/gamelog" element={<GameLog />} />
  </Route>,
)

export default routes
