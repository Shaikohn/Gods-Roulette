import MobileOrientation from '../../components/mobileOrientation/MobileOrientation'
import { useState } from 'react'
import { MdEdit } from "react-icons/md";
import { GiConfirmed } from "react-icons/gi";
import { TiDelete } from "react-icons/ti";
import { useEffect } from 'react'
import Game from '../game/Game'
import logo from '../../assets/Logo.png'
import '../../App.css'
import './MobileHome.css'

const MobileHome = ({players, setPlayers}) => {

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
    <MobileOrientation>
        {
      game ?
      <Game players={players} setPlayers={setPlayers} /> :
      <div className='mobileBackgroundContainer'>
        <div className='mobileLogoContainer'>
          <img className='mobileLogo' src={logo} alt="" />
          <p className='mobileSlogan'>RETA A TU AMIGO PARA DESCUBRIR QUIEN ES EL MAESTRO DE LOS SLOTS</p>
        </div>
        <div className='mobileContainer'>
          <div className='mobilePlayersContainer'>
            <div className='mobilePlayersTitle'>
              <p>JUGADORES</p>
            </div>
            <div className='mobilePlayersList'>
            {
              players.map((p, i) => {
                return (
                  <div key={i} className='mobilePlayer'>
                    {
                      editingIndex === i ?
                      <input className={usedName ? 'mobileUsedNameInput' : 'mobilePlayerInput'} type='text' value={input} onChange={handleNameChange}></input> : <p> { p.name } </p>
                    }
                    {
                      editingIndex === i ?
                      <button onClick={() => editPlayerName(i)} style={{background: 'none', border: 'transparent'}}> <GiConfirmed color='white' size={25} style={{background: 'none', border: 'transparent'}}  /> </button> :
                      <button onClick={() => editOnClick(i)} style={{background: 'none', border: 'transparent'}}>< MdEdit color='white' size={25} style={{background: 'none', border: 'transparent'}}  /></button>
                    }
                  </div>
                )
              })
            }
            <div>
            {
              players.length < 3 ?
              <div>
                <button className='mobileAddPlayerButton' onClick={addNewPlayer}>Agrega un jugador</button>
              </div> : ''
            }
            
            </div>
            </div>
          </div>
          <div className='mobilePptionsContainer'>
            <div className='mobileOptionsTitle'>
              <p>INFO</p>
            </div>
            <div className='mobileOptionsList'>
            {
              players.map((p, i) => {
                return (
                  <div key={i} className='mobilePlayer' style={{justifyContent: 'center', marginLeft: '5px'}}>
                    {
                      i === 0 || i === 1 ? <p>Admin.</p> : <button  onClick={() => deleteOnClick(i)} style={{background: 'none', border: 'transparent'}}><TiDelete color='white' size={40} style={{background: 'none', border: 'transparent', marginLeft: '-5px'}} /></button>
                    }
                  </div>
                )
              })
            }
            </div>
          </div>
          <div className='mobileButtonsContainer'>
            <div>
            <button className='mobilePlayButton' onClick={handleEditing}>JUGAR</button>
            </div>
            <div>
              <button className='mobileButtons'><a href='https://deltabet.xyz/instrucciones-magic-island' target='blank'>INSTRUCCIONES</a></button>
            </div>
            <div>
              <button className='mobileButtons'><a href='https://deltabet.xyz/' target='blank'>MAS JUEGOS</a></button>
            </div>
          </div>
        </div> 
        <p className='mobileDisclaimer'>Al clickear JUGAR estas aceptando que ni DeltaBet.xyz ni MagicIsland.app se haran cargo de tus perdidas o ganancias. Si no quieres perder $ , te recomendamos jugar en los slots de prueba</p>
      </div>
      
    }
    </MobileOrientation>
  )
}

export default MobileHome