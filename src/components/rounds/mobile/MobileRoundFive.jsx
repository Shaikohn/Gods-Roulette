import React, { useState } from 'react'
import { useModal } from '../../modals/useModal'
import trophy from '../../../assets/trophy.png'
import './MobileRounds.css'
import logo from '../../../assets/Logo.png'
import jugadaIMG from '../../../assets/jugada.png'
import tiradaIMG from '../../../assets/tiradas.png'
import MobileModals from '../../modals/MobileModals'

const MobileRoundFive = ({players, setPlayers, setRound}) => {

    const [turn, setTurn] = useState(0)
    const [gamble, setGamble] = useState('')
    const [gambleRound, setGambleRound] = useState('')
    const [spin, setSpin] = useState(false)
    const max = players.length - 1
    const [isOpenGameModal, openGameModal, closeGameModal] = useModal(false);
    const [input, setInput] = useState('')
    const [leaderboard, setLeaderboard] = useState(false)
    const [finished, setFinished] = useState(false)
    const [spinning, setSpinning] = useState(false)

    const shuffleArray = (a) => {
      a.sort(()=> Math.random() - 0.5);
    }
    
    const spinGamblesAndRounds = async () => {
      setSpinning(true)
      const gambles = import.meta.glob('../../../assets/gambles/*.{png,jpg,jpeg,svg}');
      const gambleArray = [];
  
      const gambleRound = import.meta.glob('../../../assets/rounds/*.{png,jpg,jpeg,svg}');
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
        updatedPlayers[turn].rounds[4].preBalance = input;
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
        updatedPlayers[turn].rounds[4].postBalance = input;
        const difference = updatedPlayers[turn].rounds[4].postBalance - updatedPlayers[turn].rounds[4].preBalance;
        const balance = (difference / updatedPlayers[turn].rounds[4].preBalance)
        updatedPlayers[turn].rounds[4].balance = parseFloat(balance.toFixed(3))
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
  
    const finishGame = () => {
      const sortedPlayers = [...players].sort((a, b) => b.totalBalance - a.totalBalance);
      setPlayers(sortedPlayers);
      setLeaderboard(false)
      setFinished(true)
    }
  
    const reloadButton = () => {
      window.location.reload();
    };

  return (
    <div className='mobileRoundFiveContainer'>
      <div className='mobileHeader'>
        <p className='mobileHeaderText'> Turno de {players[turn].name} </p>
      </div>
      <div className='mobileLogo-container'>
        <img className='mobileSmallLogo' src={logo} alt='' />
      </div>
      <div className='mobileFooter'>
        <button onClick={() => openGameModal()} className='mobileNextButton'>SIGUIENTE</button>
      </div>
      <MobileModals isOpenModal={isOpenGameModal} closeModal={closeGameModal}>
        {
          gamble === '' ?
          <div>
            <p className='mobileModalTitle'>GIRA PARA OBTENER LA JUGADA!</p>
            <p className='mobileTitles'>JUGADA</p>
            <img className='mobileImages' src={jugadaIMG} alt='' />
            <p className='mobileTitles' style={{marginTop: '10px'}}>TIRADAS</p>
            <img className='mobileImages' src={tiradaIMG} alt='' />
            <div style={{textAlign: 'center'}}>
              { spinning ?
              <button disabled className='mobileSpinButton'>CARGANDO</button> : <button onClick={() => spinGamblesAndRounds()} className='mobileSpinButton'>GIRAR</button>
              }
            </div>
        </div> : ''
        }
        {
          gamble !== '' & spin ?
          <div>
            <p className='mobileModalTitle'>OBTUVISTE TU APUESTA!</p>
            <p className='mobileTitles'>JUGADA</p>
            <img className='mobileImages' src={gamble} alt='' />
            <p className='mobileTitles' style={{marginTop: '10px'}}>TIRADAS</p>
            <img className='mobileImages' src={gambleRound} alt='' />
            <div style={{textAlign: 'center'}}>
              <button onClick={() => setSpin(false)} className='mobileSpinButton'>SIGUIENTE</button>
            </div>
          </div> : ''
        }
        {
          gamble !== '' & !spin ?
          <div>
            {
              players[turn].rounds[4].preBalance === 0 && leaderboard === false ?
              <div>
                <p className='mobileModalTitle'>INGRESA TU BALANCE ANTES DE JUGAR!</p>
                <div style={{ display: 'flex' }}>
              <div style={{ position: 'relative' }}>
                <p className='mobileTitles' style={{marginLeft: '5px'}}>JUGADA</p>
                <img className='mobileImages' src={gamble} alt='' style={{margin: '5px'}} />
              </div>
              <div style={{ position: 'relative' }}>
                <p className='mobileTitles' style={{marginLeft: '5px'}}>TIRADAS</p>
                <img className='mobileImages' src={gambleRound} alt='' style={{margin: '5px'}} />
              </div>
            </div>
            <div className='mobileBalances'>
              <p className='mobileActive'>BALANCE PREVIO</p>
              <p className='mobileInactive'>BALANCE POSTERIOR</p>
            </div>
            <div className='mobileBalanceDiv'>
              <p>Ingresa tu balance antes de hacer el desafio</p>
              <div className='mobileInput-container'>
                <input type='number' className='mobileBalanceInput' value={input} onChange={handlePreBalance} />
              </div>
            </div>
            <button className='mobileSpinButton' onClick={() => addPreBalance()}>ENVIAR</button>
              </div> : 
              ""
            }
            {
              players[turn].rounds[4].preBalance !== 0 && leaderboard === false && finished === false  ?
              <div>
                <p className='mobileModalTitle'>INGRESA TU BALANCE POSTERIOR</p>
                <div style={{ display: 'flex' }}>
                  <div style={{ position: 'relative' }}>
                    <p className='mobileTitles' style={{marginLeft: '5px'}}>JUGADA</p>
                    <img className='mobileImages' src={gamble} alt='' style={{margin: '5px'}} />
                  </div>
                  <div style={{ position: 'relative' }}>
                    <p className='mobileTitles' style={{marginLeft: '5px'}}>TIRADAS</p>
                    <img className='mobileImages' src={gambleRound} alt='' style={{margin: '5px'}} />
                  </div>
                </div>
            <div className='mobileBalances'>
              <p className='mobileInactive'>BALANCE PREVIO</p>
              <p className='mobileActive'>BALANCE POSTERIOR</p>
            </div>
          <div className='mobileBalanceDiv'>
            <p>Ingresa tu balance despues de hacer el desafio</p>
            <div className='mobileInput-container'>
              <input type='number' className='mobileBalanceInput' value={input} onChange={handlePostBalance}></input>
            </div>
          </div>
          <button className='mobileSpinButton' onClick={() => addPostBalance()}>ENVIAR</button>
            </div> : ''
            }
          </div> : ''
        }
        {
          leaderboard ? (
            <div>
              <div className='mobileLeaderboardContainer'>
              <div className='mobileLeaderboardHeaders'>
                <p>JUGADOR</p>
                <p>BALANCE</p>
                <p>BALANCE TOTAL</p>
              </div>
          {
            players.map((p, i) => {
              return (
                <div key={i} className='mobileLeaderboardRow'>
                  <p> {p.name} </p>
                  <p> {p.rounds[4].balance}X</p>
                  <p> {p.totalBalance}X </p>
                </div>
              )
            })
          }
          </div>
          {
            turn === max ?
            <button className='mobileSpinButton' onClick={() => finishGame()}>SIGUIENTE</button> : <button className='mobileSpinButton' onClick={() => nextTurn()}>SIGUIENTE</button>
          }
          </div>
          )
          : ''
        }
        {
          finished ?
          <div className='mobileFinishedContainer'>
            <p style={{fontSize: '25px'}}>RESULTADO</p>
            <div className='mobileTrophyContainer'>
              <img className='mobileTrophyImage' src={trophy} alt='' />
              <p className='mobileWinner'> {players[0].name} </p>
            </div>
            <p style={{marginTop: '10px'}}> 2- {players[1].name}</p>
            {players.length === 3 ? <p style={{marginTop: '-15px'}}> 3- {players[2].name}</p> : ''}
            <button className='mobileSpinButton' onClick={() => reloadButton()} style={{marginTop: '-20px'}}>VOLVER AL INICIO</button>
            <button className='mobileSpinButton' style={{marginLeft: '50px', marginTop: '-20px'}}><a href='https://deltabet.xyz/' target='blank'>MAS JUEGOS</a></button>
          </div> : ''
        }
      </MobileModals>
    </div>
  )
}

export default MobileRoundFive