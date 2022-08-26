import React from 'react'
import propTypes from 'prop-types'
import { AppBar, Toolbar, Typography } from '@mui/material'

import '../Layout/Layout.css'

const PlayerHeader = ({ num, score }) => {
  return (
    <AppBar position="sticky" className="header" style={{ backgroundColor: 'white', boxShadow: 'none' }}>
      <Toolbar style={{ justifyContent: 'space-between', color: 'black' }}>
          <Typography variant="h5" noWrap>
            {num}
          </Typography>
          <Typography variant="h5" noWrap>
            {score}
          </Typography>
      </Toolbar>
    </AppBar>
  )
}

PlayerHeader.propTypes = {
  num: propTypes.number,
  score: propTypes.string
}

export default PlayerHeader
