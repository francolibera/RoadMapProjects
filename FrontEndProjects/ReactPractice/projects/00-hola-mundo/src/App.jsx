import './App.css'
import { TwitterFollowCard } from './TwitterFollowCard.jsx'

export function App() {

  return (
  <section className='App'>
  <TwitterFollowCard  initialIsFollowing={true} userName="francolibera" name="Franco Libera" />
  <TwitterFollowCard  initialIsFollowing={true} userName="midudev" name="Miguel Ángel Durán" />
  <TwitterFollowCard  initialIsFollowing={false} userName="eliasusu" name="Elias Palamidessi" />
  </section>
  )
}

export default App
