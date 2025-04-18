/*global chrome*/
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(2),
    "& FormControlLabel": {
      width: "40%",
      display: "flex",
      justifyContent: "space-between",
    },
  },
}));

export default function TimeCheckForm() {
  const classes = useStyles();

  const [state, setState] = React.useState({
    fiftyMinutes: false,
    tenMinutes: false,
    twoMinutes: false,
    oneMinute: false,
    twentySeconds: false,
  });

  React.useEffect(() => {
    chrome.storage.sync.get(state, (result) => {
      // if value is array (from previous version) - delete storage or convert to boolean
      for (let key in result) {
        if (Array.isArray(result[key])) {
          result[key] = result[key][0];
        }
      }
      chrome.storage.sync.set(result);
      setState(result);
    });
  }, []);

  const handleTimeChoice = (event) => {
    const { name, checked } = event.target;
    setState({ ...state, [name]: checked });
    chrome.storage.sync.set({ ...state, [name]: checked }, () => {
      console.log([name] + " is set to " + checked);
    });
  };

  const { fiftyMinutes, tenMinutes, twoMinutes, oneMinute, twentySeconds } =
    state;

  return (
    <div className={classes.root}>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">
          Notify me when the session starts
        </FormLabel>
        <FormLabel component="legend">
          (if the dashboard/session window is open)
        </FormLabel>
        <FormControlLabel
          control={
            <Checkbox
              checked={fiftyMinutes}
              onChange={handleTimeChoice}
              name="fiftyMinutes"
              value="50 minutes"
            />
          }
          label="A few seconds before"
        />
      </FormControl>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel>Notify me before the session ends</FormLabel>
        <FormGroup row="true" aria-label="Ringtime end">
          <FormControlLabel
            control={
              <Checkbox
                checked={tenMinutes}
                onChange={handleTimeChoice}
                name="tenMinutes"
                //not so important to have the value since this is set in an obj. literal in background script but will leave it for now.
                value="10 minutes"
              />
            }
            label="10 minutes"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={twoMinutes}
                onChange={handleTimeChoice}
                name="twoMinutes"
                value="2 minutes"
              />
            }
            label="2 minutes"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={oneMinute}
                onChange={handleTimeChoice}
                name="oneMinute"
                value="1 minutes"
              />
            }
            label="1 minute"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={twentySeconds}
                onChange={handleTimeChoice}
                name="twentySeconds"
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
