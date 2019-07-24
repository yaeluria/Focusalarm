/*global chrome*/
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import Checkbox from '@material-ui/core/Checkbox';
import RadioGroup from '@material-ui/core/RadioGroup';
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

    //const classes = useStyles();
   state= {
      10 minutes : true,
      2 minutes: false,
     
    }
  
     handleChange = name => event => {
      setState({ ...state, [name]: event.target.checked });
    };
  
  { 10 minutes, 2 minutes } = state;
//   state = {
//     value: {}
//   };

//   handleChange = event => {
//     const timeVal = event.target.value;
//     console.log('timeVal before callback is' + timeVal);
 
//     chrome.storage.sync.set({ 'time': timeVal }, () => {
//         console.log('Value is set to ' + timeVal);
//       });
  
//     this.setState({value: timeVal});
// };

// componentDidMount() {
//     this.fetchSettings();
//   }  
//   fetchSettings() {
  
//         chrome.storage.sync.get(['time'], (result)=>{
//             const time = result.time || '1 minute'
//                 this.setState({value: time});
//         })
//   }  

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
            <FormControlLabel value="10 minutes" control={<Checkbox checked={10 minutes} onChange = {handleChange('10 minutes')} value ="10 minutes"/>} label="10 minutes" />
      
   
            <FormControlLabel value="On end" control={<Checkbox checked={2 minutes} onChange = {handleChange('2 minutes')} value ="2 minutes" />} label="2 minutes" />
            <FormControlLabel value="1 minutes" control={<Checkbox checked={1 minute} onChange = {handleChange('1 minute')} value ="2 minute" />} label="1 minute" />
            <FormControlLabel value="20 seconds" control={<Checkbox checked={20 seconds} onChange = {handleChange('20 seconds')} value ="20 seconds" />} label="20 seconds" />
            <FormControlLabel value="Session Completed" control={<Checkbox checked={On end} onChange = {handleChange('On end')} value ="On end" />} label="On End" />

          </RadioGroup>
        </FormControl>
        


      </div>
    );
  }
}

TimeCheckForm.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(TimeCheckForm);