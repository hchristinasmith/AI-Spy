import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <>
      <header>
        <h1>AI SPY</h1>
      </header>
      <main>
        <Outlet />
      </main>
      <footer></footer>
    </>
  )
}
