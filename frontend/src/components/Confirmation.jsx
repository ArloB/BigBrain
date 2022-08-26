import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText } from '@mui/material';
import PropTypes from 'prop-types'

const Confirmation = (props) => {
  return (
      <Dialog open={props.open} onClose={props.toggle} aria-labelledby="form-dialog-title">
        <br />
        <DialogContent>
          <DialogContentText>
            {props.desc}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.toggle} color="primary">
            Cancel
          </Button>
          <Button onClick={props.yes} color="error">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
  );
}

Confirmation.propTypes = {
  toggle: PropTypes.func,
  yes: PropTypes.func,
  desc: PropTypes.string,
  open: PropTypes.bool
}

export default Confirmation
