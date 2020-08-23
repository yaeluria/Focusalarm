/*global chrome*/
import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

const styles = theme => ({
  root: {
    margin: `${theme.spacing.unit * 3}px 10px`
  },
  formControl: {
    marginTop: theme.spacing.unit * 3
  }
});

class TimeCheckForm extends React.Component {
  state = {
    fiftyMinutes: true,
    tenMinutes: false,
    twoMinutes: false,
    oneMinute: false,
    twentySeconds: true
  };

  componentDidMount() {
    this.fetchSettings();
  }

  fetchSettings() {
      for (let timeOption in this.state) {
          chrome.storage.sync.get([timeOption], (result) => {
              const timeStatus = (result[timeOption])[0] || false;
              this.setState({[timeOption]: timeStatus});
          })
      }
  }

  handleTimeChoice = name => event => {
    const checked = event.target.checked;
    this.setState({ [name]: checked });
    chrome.storage.sync.set({ [name]: [checked, event.target.value] }, () => {
      console.log([name] + " is set to " + checked);
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend">
            Notify me when the session starts
          </FormLabel>
          <FormGroup
            className={classes.group}
            row="true"
            aria-label="Ringtime start"
          >
            <FormControlLabel
              value="50 minutes"
              control={
                <Checkbox
                  checked={this.state.fiftyMinutes}
                  onChange={this.handleTimeChoice("fiftyMinutes")}
                  value="50 minutes"
                />
              }
              label="On start"
            />
          </FormGroup>
        </FormControl>
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel>Notify me before the session ends</FormLabel>
          <FormGroup
            className={classes.group}
            row="true"
            aria-label="Ringtime end"
          >
            <FormControlLabel
              value="10 minutes"
              control={
                <Checkbox
                  checked={this.state.tenMinutes}
                  onChange={this.handleTimeChoice("tenMinutes")}
                  value="10 minutes"
                />
              }
              label="10 minutes"
            />
            <FormControlLabel
              value="2 minutes"
              control={
                <Checkbox
                  checked={this.state.twoMinutes}
                  onChange={this.handleTimeChoice("twoMinutes")}
                  value="2 minutes"
                />
              }
              label="2 minutes"
            />
            <FormControlLabel
              value="1 minutes"
              control={
                <Checkbox
                  checked={this.state.oneMinute}
                  onChange={this.handleTimeChoice("oneMinute")}
                  value="1 minutes"
                />
              }
              label="1 minute"
            />
            <FormControlLabel
              value="20 seconds"
              control={
                <Checkbox
                  checked={this.state.twentySeconds}
                  onChange={this.handleTimeChoice("twentySeconds")}
                  value="20 seconds"
                />
              }
              label="20 seconds"
            />
          </FormGroup>
        </FormControl>
      </div>
    );
  }
}

TimeCheckForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TimeCheckForm);
