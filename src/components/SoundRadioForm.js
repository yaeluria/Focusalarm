/*global chrome*/
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';



const styles = theme => ({
    root: {
        display: 'flex',
    },
    formControl: {
        margin: theme.spacing.unit 

    },
    group: {
        margin: `${theme.spacing.unit}px 0`,

    },

    audio: {
        marginTop: '0.5rem',
        marginLeft: 'auto'
    }
});

//another option- popup- no sound!

class SoundRadioForm extends React.Component {

    state = {
      value: {}
    };

    handleChange = event => {
        const soundVal = event.target.value;
        console.log('soundVal before callback is' + soundVal);
     
        chrome.storage.sync.set({ 'sound': soundVal }, () => {
            console.log('Value is set to ' + soundVal);
          });
        this.setState({value: soundVal});
    };

    componentDidMount() {
        this.fetchSettings();
      }  
      fetchSettings() {
      
            chrome.storage.sync.get(['sound'], (result)=>{
                const sound = result.sound || 'bell'
                    this.setState({value: sound});
            })
      }  
   
    render() {
        const { classes } = this.props;
 
    
        return (
            <div className={classes.root}>

                <FormControl component="fieldset" className={classes.formControl}>
                    <FormLabel component="legend">Sound</FormLabel>
                    <RadioGroup
                        row="true"
                        aria-label="sound"
                        name="sound"
                        className={classes.group}
                        value={this.state.value}
                        onChange={this.handleChange}
                    >
                        <FormControlLabel value="Bell" control={<Radio />} label="Bell" />
                        <audio
                            className={classes.audio}
                            controls
                            src="https://res.cloudinary.com/drvycak8r/video/upload/v1557737548/storage/30161__herbertboland__belltinystrike.wav">
                            Your browser does not support the
                        <code>audio</code> element.
                        </audio>
                        <FormControlLabel value="T.rex roar" control={<Radio />} label="T. rex roar" />
                        <audio
                            className={classes.audio}
                            controls
                            src="https://interactive-examples.mdn.mozilla.net/media/examples/t-rex-roar.mp3">
                                                Your browser does not support the
                                <code>audio</code> element.
                        </audio>

                        <FormControlLabel value="Chirp" control={<Radio />} label="Chirp" />
                        <audio
                            className={classes.audio}
                            controls
                            src="https://res.cloudinary.com/drvycak8r/video/upload/v1557737433/storage/85403__readeonly__canaryartie-3.wav">
                            Your browser does not support the
               <code>audio</code> element.
           </audio>


                    </RadioGroup>
                </FormControl>


            </div>
        );
    }
}

SoundRadioForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SoundRadioForm);