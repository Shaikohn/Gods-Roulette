import logo from '../../assets/Logo.png'
import '../../App.css'
import './Home.css'
import { useState } from 'react'
import { MdEdit } from "react-icons/md";
import { GiConfirmed } from "react-icons/gi";
import { TiDelete } from "react-icons/ti";
import { useEffect } from 'react'
import Game from '../game/Game'
import MobileHome from './MobileHome';

const Home = ({players, setPlayers}) => {

    const [name, setName] = useState(`Jugador ${players.length + 1}`)
    const [input, setInput] = useState("")
    const [editingIndex, setEditingIndex] = useState(null);
    const [num, setNum] = useState(2)
    const [usedName, setUsedName] = useState(false)
    const [game, setGame] = useState(false)
  
    useEffect(() => {
    }, [players])
  
    const addNewPlayer = () => {
      setPlayers([...players, {name: `Jugador 3`, totalBalance: 0, rounds: [
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
      setNum(num + 1)
    }
  
    const handleNameChange = (e) => {
      setInput(e.target.value)
    }
  
    const editPlayerName = (i) => {
      setName(input);
      let otherPlayers = (players.filter((_, index) => index !== i));
      let existingName = otherPlayers.find(p => p.name === input)
      if(existingName) {
        setUsedName(true)
      } else {
        setUsedName(false)
        const updatedPlayers = [...players];
        updatedPlayers[i].name = input;
        setPlayers(updatedPlayers);
        setInput("")
        setEditingIndex(null);
      }
    }
  
    const editOnClick = (i) => {
      setInput(players[i].name)
      setEditingIndex(i);
    }
  
    const deleteOnClick = (i) => {
      const deletePlayer = [...players]
      deletePlayer.splice(i, 1)
      setPlayers(deletePlayer)
    }

    const handleEditing = (e) => {
      if(editingIndex !== null) {
        e.preventDefault()
      } else {
        setGame(true)
      }
    }

  return (
    <div>
      <div className='mobile-only' style={{textAlign: 'center'}}>
        <MobileHome players={players} setPlayers={setPlayers} />
      </div>
    <div className='pc-only'>
    {
      game ?
      <Game players={players} setPlayers={setPlayers} /> :
      <div className='backgroundContainer'>
        <div className='logoContainer'>
          <img className='logo' src={logo} alt="" />
          <p className='slogan'>RETA A TU AMIGO PARA DESCUBRIR QUIEN ES EL MAESTRO DE LOS SLOTS</p>
        </div>
        <div className='container'>
          <div className='playersContainer'>
            <div className='playersTitle'>
              <h3>JUGADORES</h3>
            </div>
            <div className='playersList'>
            {
              players.map((p, i) => {
                return (
                  <div key={i} className='player'>
                    {
                      editingIndex === i ?
                      <input className={usedName ? 'usedNameInput' : 'playerInput'} type='text' value={input} onChange={handleNameChange}></input> : <p> { p.name } </p>
                    }
                    {
                      editingIndex === i ?
                      <button onClick={() => editPlayerName(i)}> <GiConfirmed color='white' size={30}  /> </button> :
                      <button onClick={() => editOnClick(i)}>< MdEdit color='white' size={30}  /></button>
                    }
                  </div>
                )
              })
            }
            <div>
            {
              players.length < 3 ?
              <div>
                <button className='addPlayerButton' onClick={addNewPlayer}>Agrega un jugador</button>
              </div> : ''
            }
            
            </div>
            </div>
          </div>
          <div className='optionsContainer'>
            <div className='optionsTitle'>
              <h3>INFO</h3>
            </div>
            <div className='optionsList'>
            {
              players.map((p, i) => {
                return (
                  <div key={i} className='player' style={{justifyContent: 'normal'}}>
                    {
                      i === 0 || i === 1 ? <p>Admin.</p> : <button  onClick={() => deleteOnClick(i)} style={{marginLeft: '-10px'}}><TiDelete color='white' size={50} /></button>
                    }
                  </div>
                )
              })
            }
            </div>
          </div>
          <div className='buttonsContainer'>
            <div>
            <button className='playButton' onClick={handleEditing}>JUGAR</button>
            </div>
            <div>
              <button className='buttons'><a href='https://deltabet.xyz/instrucciones-magic-island' target='blank'>INSTRUCCIONES</a></button>
            </div>
            <div>
              <button className='buttons'><a href='https://deltabet.xyz/' target='blank'>MAS JUEGOS</a></button>
            </div>
          </div>
        </div> 
        <p className='disclaimer'>Al clickear JUGAR estas aceptando que ni DeltaBet.xyz ni God's Roulette se haran cargo de tus perdidas o ganancias. Si no quieres perder $ , te recomendamos jugar en los slots de prueba</p>
      </div>
      
    }
    </div>
    </div>
  )
}

export default Home