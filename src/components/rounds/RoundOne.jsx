import React, { useState } from 'react'
import { useModal } from '../modals/useModal'
import Modals from '../modals/Modals'
import './Rounds.css'
import logo from '../../assets/Logo.png'
import jugadaIMG from '../../assets/jugada.png'
import tiradaIMG from '../../assets/tiradas.png'
import MobileRoundOne from './mobile/MobileRoundOne'

const RoundOne = ({players, setPlayers, setRound}) => {

  const [turn, setTurn] = useState(0)
  const [gamble, setGamble] = useState('')
  const [gambleRound, setGambleRound] = useState('')
  const [spin, setSpin] = useState(false)
  const max = players.length - 1
  const [isOpenGameModal, openGameModal, closeGameModal] = useModal(false);
  const [input, setInput] = useState('')
  const [leaderboard, setLeaderboard] = useState(false)
  const [spinning, setSpinning] = useState(false)

  const shuffleArray = (a) => {
    a.sort(()=> Math.random() - 0.5);
  }
  
  const spinGamblesAndRounds = async () => {
    setSpinning(true)
    const gambles = import.meta.glob('../../assets/gambles/*.{png,jpg,jpeg,svg}');
    const gambleArray = [];

    const gambleRound = import.meta.glob('../../assets/rounds/*.{png,jpg,jpeg,svg}');
    const gambleRoundArray = [];
  
    for (const path in gambles) {
      const gamble = await gambles[path]();
      gambleArray.push(gamble.default);
    }
    for (const path in gambleRound) {
      const gambleR = await gambleRound[path]();
      gambleRoundArray.push(gambleR.default);
    }
    shuffleArray(gambleArray)
    shuffleArray(gambleRoundArray)
    setGamble(gambleArray[0])
    setGambleRound(gambleRoundArray[0])
    setSpin(true)
    setSpinning(false)
  };

  const handlePreBalance = (e) => {
    setInput(e.target.value)
  }

  const addPreBalance = () => {
    if(input !== '') {
      const updatedPlayers = [...players];
      updatedPlayers[turn].rounds[0].preBalance = input;
      setPlayers(updatedPlayers);
      setInput('')
    }
  }

  const handlePostBalance = (e) => {
    setInput(e.target.value)
  }

  const addPostBalance = () => {
    if(input !== '') {
      const updatedPlayers = [...players];
      updatedPlayers[turn].rounds[0].postBalance = input;
      const difference = updatedPlayers[turn].rounds[0].postBalance - updatedPlayers[turn].rounds[0].preBalance;
      const balance = (difference / updatedPlayers[turn].rounds[0].preBalance)
      updatedPlayers[turn].rounds[0].balance = parseFloat(balance.toFixed(3))
      updatedPlayers[turn].totalBalance = parseFloat(parseFloat(updatedPlayers[turn].totalBalance) + parseFloat(balance.toFixed(3))).toFixed(3)
      setPlayers(updatedPlayers);
      setInput('')
      setLeaderboard(true)
    }
  }

  const nextTurn = () => {
    setTurn(turn + 1)
    setLeaderboard(false)
    setGamble('')
    setGambleRound('')
    closeGameModal()
  }

  const nextRound = () => {
    setTurn(0)
    closeGameModal()
    setRound(2)
  }
  
  return (
    <div>
      <div className='mobile-only' style={{textAlign: 'center'}}>
        <MobileRoundOne players={players} setPlayers={setPlayers} setRound={setRound} />
      </div>
    <div className='roundOneContainer pc-only'>
      <div className='header'>
        <p className='headerText'> Turno de {players[turn].name} </p>
      </div>
      <div className='logo-container'>
        <img className='smallLogo' src={logo} alt='' />
      </div>
      <div className='footer'>
        <button onClick={() => openGameModal()} className='nextButton'>SIGUIENTE</button>
      </div>
      <Modals isOpenModal={isOpenGameModal} closeModal={closeGameModal}>
        {
          gamble === '' ?
          <div>
            <p className='modalTitle'>GIRA PARA OBTENER LA APUESTA!</p>
            <p className='titles'>JUGADA</p>
            <img className='images' src={jugadaIMG} alt='' />
            <p className='titles'>TIRADAS</p>
            <img className='images' src={tiradaIMG} alt='' />
            <div style={{textAlign: 'center'}}>
              { spinning ?
              <button disabled className='spinButton'>CARGANDO</button> : <button onClick={() => spinGamblesAndRounds()} className='spinButton'>GIRAR</button>
              }
            </div>
        </div> : ''
        }
        {
          gamble !== '' & spin ?
          <div>
            <p className='modalTitle'>OBTUVISTE TU APUESTA!</p>
            <p className='titles'>JUGADA</p>
            <img className='images' src={gamble} alt='' />
            <p className='titles'>TIRADAS</p>
            <img className='images' src={gambleRound} alt='' />
            <div style={{textAlign: 'center'}}>
              <button onClick={() => setSpin(false)} className='spinButton'>SIGUIENTE</button>
            </div>
          </div> : ''
        }
        {
          gamble !== '' & !spin ?
          <div>
            {
              players[turn].rounds[0].preBalance === 0 && leaderboard === false ?
              <div>
                <p className='modalTitle'>INGRESA TU BALANCE ANTES DE JUGAR!</p>
                <div style={{ display: 'flex' }}>
              <div style={{ position: 'relative' }}>
                <p className='titles' style={{marginLeft: '5px'}}>JUGADA</p>
                <img className='images' src={gamble} alt='' style={{margin: '5px'}} />
              </div>
              <div style={{ position: 'relative' }}>
                <p className='titles' style={{marginLeft: '5px'}}>TIRADAS</p>
                <img className='images' src={gambleRound} alt='' style={{margin: '5px'}} />
              </div>
            </div>
            <div className='balances'>
              <p className='active'>BALANCE PREVIO</p>
              <p className='inactive'>BALANCE POSTERIOR</p>
            </div>
            <div className='balanceDiv'>
              <p>Ingresa tu balance antes de hacer el desafio</p>
              <div className='input-container'>
                <input type='number' className='balanceInput' value={input} onChange={handlePreBalance} />
              </div>
            </div>
            <button className='spinButton' onClick={() => addPreBalance()}>ENVIAR</button>
              </div> : 
              ""
            }
            {
              players[turn].rounds[0].preBalance !== 0 && leaderboard === false ?
              <div>
                <p className='modalTitle'>INGRESA TU BALANCE POSTERIOR</p>
                <div style={{ display: 'flex' }}>
              <div style={{ position: 'relative' }}>
                <p className='titles' style={{marginLeft: '5px'}}>JUGADA</p>
                <img className='images' src={gamble} alt='' style={{margin: '5px'}} />
              </div>
              <div style={{ position: 'relative' }}>
                <p className='titles' style={{marginLeft: '5px'}}>TIRADAS</p>
                <img className='images' src={gambleRound} alt='' style={{margin: '5px'}} />
              </div>
            </div>
            <div className='balances'>
              <p className='inactive'>BALANCE PREVIO</p>
              <p className='active'>BALANCE POSTERIOR</p>
            </div>
          <div className='balanceDiv'>
            <p>Ingresa tu balance despues de hacer el desafio</p>
            <div className='input-container'>
              <input type='number' className='balanceInput' value={input} onChange={handlePostBalance}></input>
            </div>
          </div>
          <button className='spinButton' onClick={() => addPostBalance()}>ENVIAR</button>
            </div> : ''
            }
          </div> : ''
        }
        {
          leaderboard ? (
            <div>
              <div className='leaderboardContainer'>
              <div className='leaderboardHeaders'>
                <p>JUGADOR</p>
                <p>BALANCE</p>
                <p>BALANCE TOTAL</p>
              </div>
          {
            players.map((p, i) => {
              return (
                <div key={i} className='leaderboardRow'>
                  <p> {p.name} </p>
                  <p> {p.rounds[0].balance}X</p>
                  <p> {p.totalBalance}X </p>
                </div>
              )
            })
          }
          </div>
          {
            turn === max ?
            <button className='spinButton' onClick={() => nextRound()}>SIGUIENTE</button> : <button className='spinButton' onClick={() => nextTurn()}>SIGUIENTE</button>
          }
          </div>
          )
          : ''
        }
      </Modals>
    </div>
    </div>
  )
}

export default RoundOne