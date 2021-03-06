import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
});

function FloatingActionButtons(props) {
  const { classes } = props;
  return (
    <div>
      <Button 
        variant={props.variant?props.variant:"fab"} 
        color="primary" aria-label="Add" 
        className={classes.button}
        fullWidth={props.fullWidth}
        style={props.style}
        onClick={props.onClick} >
        {
          props.AddIcon
          ?
          <AddIcon />
          : null
        }
        {
          props.label ? props.label : null
        }
      </Button>
    </div>
  );
}

FloatingActionButtons.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FloatingActionButtons);