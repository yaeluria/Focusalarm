import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
// import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';


const styles = theme => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing.unit * 3,
  },
  group: {
    margin: `${theme.spacing.unit}px 0`,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    height: '100%',
    color: theme.palette.text.secondary,
  },
  control: {
    padding: theme.spacing.unit * 2,
  },

});

class TimeRadioForm extends React.Component {
  state = {
    value: '1 minute',
  };

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  render() {
    const { classes } = this.props;
    

    return (
      <div className={classes.root}>

        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend">Ringing Time</FormLabel>
          <RadioGroup
            row="true"
            aria-label="Ringtime"
            name="ringtime"
            className={classes.group}
            value={this.state.value}
            onChange={this.handleChange}
          >
            <FormControlLabel value="1 minute" control={<Radio />} label="1 minute" />
            <FormControlLabel value="20 seconds" control={<Radio />} label="20 seconds" />
            <FormControlLabel value="Session end" control={<Radio />} label="Session end" />

          </RadioGroup>
        </FormControl>


      </div>
    );
  }
}

TimeRadioForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TimeRadioForm);