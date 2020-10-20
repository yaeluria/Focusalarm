/*global chrome*/
import React from "react";
import { Radio, RadioGroup } from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import IconButton from "@material-ui/core/IconButton";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignContent: "space-between",
  },
  buttons: {
    marginTop: theme.spacing(1),
  },
  label: {
    minWidth: 90
  }
}));

export default function SoundRadioForm() {
  const [value, setValue] = React.useState("Bell");

  React.useEffect(() => {
    chrome.storage.sync.get(["sound"], (result) => {
      if(!result.sound){
        setStorage("Bell");
      }
      const sound = result.sound || "Bell";
      if (sound === "T.rex roar") {
        console.log("setting to bleat");
        setStorage("Bleat");
      }
      setValue(sound);
    });
  }, []);
  
  const setStorage = soundVal => {
    chrome.storage.sync.set({ sound: soundVal }, () => {
      console.log(`sound is set to ${soundVal}`);
    });
    setValue(soundVal);
  };

  const selectSound = (event) => {
    const soundValue = event.target.value;
    setStorage(soundValue);
  }
  const playSample = (name) => {
    let sampleSound = new Audio(`/${name}.mp3`);
    sampleSound.play();
  };
  const classes = useStyles();

  return (
    <FormControl className={classes.root} component="fieldset">
      <FormLabel component="legend">Sound</FormLabel>
      <RadioGroup
        aria-label="sound"
        name="sound1"
        value={value}
        onChange={selectSound}
        className={classes.buttons}
      >
        <span>
          <FormControlLabel value="Bell" className={classes.label} control={<Radio />} label="Bell" />
          <IconButton
            onClick={() => playSample("bell")}
            aria-label="play-sample-bell"
          >
            <PlayCircleOutlineIcon />
          </IconButton>
        </span>
        <span>
          <FormControlLabel value="Bleat" className={classes.label} control={<Radio />} label="Bleat" />
          <IconButton
            onClick={() => playSample("bleat")}
            aria-label="play-sample-bleat"
          >
            <PlayCircleOutlineIcon />
          </IconButton>
        </span>
        <span>
          <FormControlLabel value="Chirp"  className={classes.label} control={<Radio />} label="Chirp" />
          <IconButton
            onClick={() => playSample("chirp")}
            aria-label="play-sample-chirp"
          >
            <PlayCircleOutlineIcon />
          </IconButton>
        </span>
      </RadioGroup>
    </FormControl>
  );
}
