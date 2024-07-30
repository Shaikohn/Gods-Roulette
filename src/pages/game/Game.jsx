import React, { useState, useEffect } from 'react'
import RoundOne from '../../components/rounds/RoundOne';
import RoundTwo from '../../components/rounds/RoundTwo';
import RoundThree from '../../components/rounds/RoundThree';
import RoundFour from '../../components/rounds/RoundFour';
import RoundFive from '../../components/rounds/RoundFive';

const Game = ({players, setPlayers}) => {

  const [round, setRound] = useState(1)

  useEffect(() => {
    
  }, [round])

  return (
    <div>
      {
        round === 1 && <RoundOne players={players} setPlayers={setPlayers} setRound={setRound} />
      }
      {
        round === 2 && <RoundTwo players={players} setPlayers={setPlayers} setRound={setRound} />
      }
      {
        round === 3 && <RoundThree players={players} setPlayers={setPlayers} setRound={setRound} />
      }
      {
        round === 4 && <RoundFour players={players} setPlayers={setPlayers} setRound={setRound} />
      }
      {
        round === 5 && <RoundFive players={players} setPlayers={setPlayers} setRound={setRound} />
      }
    </div>
  )
}

export default Game