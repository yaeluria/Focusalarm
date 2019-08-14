/*global chrome*/
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';




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

class TimeCheckForm extends React.Component {

   state= {
      tenMinutes: true,
      twoMinutes: false,
      oneMinute: false,
      twentySeconds: false
    }
  
    componentDidMount() {
      this.fetchSettings();
  }


  fetchSettings() {
      for (let timeOption in this.state) {
          chrome.storage.sync.get([timeOption], (result) => {
              console.log(result[timeOption]);
              const timeStatus = (result[timeOption])[0] || false;
              console.log(timeStatus);
              this.setState({[timeOption]: timeStatus});
          })
      }
  }


  handleChange = name => event => {
      const checked = event.target.checked;
      this.setState({[name]: checked});
      chrome.storage.sync.set({[name]: [checked, event.target.value]}, () => {
          console.log([name] + ' is set to ' + checked);
      });
  };
  


  render() {
    const { classes } = this.props;
    

    return (
      <div className={classes.root}>

        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend">Notify me before the session ends</FormLabel>
          <FormGroup
            row="true"
            aria-label="Ringtime"
            name="ringtime"
            className={classes.group}
            value={this.state.value}
            onChange={this.handleChange}
          >
            <FormControlLabel value="10 minutes" control={<Checkbox checked={this.state.tenMinutes} onChange = {this.handleChange('tenMinutes')} value ="10 minutes"/>} label="10 minutes" />
            <FormControlLabel value="2 minutes" control={<Checkbox checked={this.state.twoMinutes} onChange = {this.handleChange('twoMinutes')} value ="2 minutes" />} label="2 minutes" />
            <FormControlLabel value="1 minutes" control={<Checkbox checked={this.state.oneMinute} onChange = {this.handleChange('oneMinute')} value ="1 minutes" />} label="1 minute" />
            <FormControlLabel value="20 seconds" control={<Checkbox checked={this.state.twentySeconds} onChange = {this.handleChange('twentySeconds')} value ="20 seconds" />} label="20 seconds" />

          </FormGroup>
        </FormControl>
        


      </div>
    );
  }
}

TimeCheckForm.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(TimeCheckForm);