import React from 'react'
import propTypes from 'prop-types'

import { Button } from '@mui/material'

const Lobby = ({ prog, players }) => {
  return (
  <>
    <h1>lobey</h1>
    {players.map((player, it) => <p key={it}>{player}</p>)}
    <Button variant='contained' onClick={prog}>Start</Button>
  </>
  )
}

Lobby.propTypes = {
  prog: propTypes.func,
  players: propTypes.array
}

export default Lobby
