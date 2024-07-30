import { useState } from 'react'
import './App.css'
import NavBar from './components/navBar/NavBar'
import Home from './pages/home/Home'

function App() {
  
  const [players, setPlayers] = useState([{name: 'Jugador 1', totalBalance: 0,  rounds: [
    {
      preBalance: 0,
      postBalance: 0,
      balance: 0,
    },
    {
      preBalance: 0,
      postBalance: 0,
      balance: 0,
    },
    {
      preBalance: 0,
      postBalance: 0,
      balance: 0,
    },
    {
      preBalance: 0,
      postBalance: 0,
      balance: 0,
    },
    {
      preBalance: 0,
      postBalance: 0,
      balance: 0,
    }
  ]}, {name: 'Jugador 2', totalBalance: 0, rounds: [
    {
      preBalance: 0,
      postBalance: 0,
      balance: 0,
    },
    {
      preBalance: 0,
      postBalance: 0,
      balance: 0,
    },
    {
      preBalance: 0,
      postBalance: 0,
      balance: 0,
    },
    {
      preBalance: 0,
      postBalance: 0,
      balance: 0,
    },
    {
      preBalance: 0,
      postBalance: 0,
      balance: 0,
    }
  ]}])

  return (
    <>
      <NavBar  />
      <Home players={players} setPlayers={setPlayers} />
    </>
  )
}

export default App
