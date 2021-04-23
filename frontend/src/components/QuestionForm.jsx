import React from 'react'
import PropTypes from 'prop-types'
import { Button, Checkbox, FormControlLabel, TextField } from '@material-ui/core'

const QuestionForm = (props) => {
  const [checked, setChecked] = React.useState(false)

  const handleChange = () => {
    setChecked(!checked)
  };

  return (
    <>
      <TextField id={`text-${props.id}`} variant="outlined" margin="normal"
          type="text" label="Answer" style={{ gridColumn: props.delete ? 'auto / span 2' : 'auto / span 3' }}/>
      <FormControlLabel control={
          <Checkbox id={`check-${props.id}`} checked={checked} onChange={handleChange} color="primary"/>
      } label="Correct Answer" style={{ gridColumn: 'auto / span 2' }}/>
      {props.delete
        ? <Button onClick={() => props.delete(props.id)} variant="contained" color="secondary"
                              style={{
                                gridColumn: 'auto / span 2',
                                margin: '25px'
                              }}>Remove</Button>
        : null}
    </>
  )
}

QuestionForm.propTypes = {
  delete: PropTypes.func,
  id: PropTypes.number
}

export default QuestionForm
