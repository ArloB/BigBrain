import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import PropTypes from 'prop-types'

import AuthContext from '../components/AuthProvider'
import JoinBox from '../components/PlayerContainer/JoinBox'

import PlayerChoice from '../components/PlayerContainer/PlayerChoice'
import PlayerLobby from '../components/PlayerContainer/PlayerLobby'
import QResult from '../components/PlayerContainer/QResult'
import PlayerHeader from '../components/PlayerContainer/PlayerHeader'
import { toInteger } from 'lodash'

const PlayPage = ({ question, answer, setAnswer, correct, setCorr }) => {
  const pid = React.useContext(AuthContext).pid
  const { id } = useParams()
  const [score, setScore] = React.useState(0)

  const ws = React.useContext(AuthContext).ws

  const isLobby = q => {
    // eslint-disable-next-line no-unreachable-loop
    for (const i in q) { return true }
    return correct
  }

  useEffect(() => {
    if (correct >= 0) {
      if (correct) {
        setScore(score + toInteger(question.worth))
      }

      setCorr(-1)
    }
  }, [])

  return (
    <>
      {pid
        ? <>{isLobby(question) ? (<><PlayerHeader num={(question.pos + 1) || 0} score={score}/>{correct >= 0 ? <QResult correct={correct} /> : <PlayerChoice question={question} isMC={question.multiple_choice} pid={String(pid)} score={0} answer={answer} setAnswer={setAnswer}/>}</>) : <PlayerLobby />}</>
        : <JoinBox sid={id} ws={ws} />
      }
    </>
  )
}

PlayPage.propTypes = {
  question: PropTypes.object,
  correct: PropTypes.number,
  answer: PropTypes.number,
  setCorr: PropTypes.func,
  setAnswer: PropTypes.func
}

export default PlayPage
