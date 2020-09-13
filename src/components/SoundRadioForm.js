/*global chrome*/
import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import IconButton from '@material-ui/core/IconButton';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';

export default function SoundRadioForm() {
  const [value, setValue] = React.useState('Bell');

  React.useEffect(() => {
    chrome.storage.sync.get(["sound"], (result) => {
      const sound = result.sound || "Bell";
      setValue({ value: sound });
    });
  }, []);

  const selectSound = (event) => {
    const soundVal = event.target.value;
    chrome.storage.sync.set({ sound: soundVal }, () => {
        console.log(`sound is set to ${soundVal}`)
    });
    setValue(soundVal);
  };
  const playSample = name => {
    let sampleSound = new Audio(`/${name}.mp3`)
    sampleSound.play()
  }

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Sound</FormLabel>
      <RadioGroup
        aria-label="sound"
        name="sound1"
        value={value}
        onChange={selectSound}
      >
        <FormControlLabel value="Bell" control={<Radio />} label="Bell" />
        <IconButton onClick={() => playSample("bell")} aria-label="play-sample-bell">
          <PlayCircleOutlineIcon />
        </IconButton>
        <FormControlLabel value="Bleat" control={<Radio />} label="Bleat" />
        <IconButton onClick={() => playSample("bleat")} aria-label="play-sample-bleat">
          <PlayCircleOutlineIcon />
        </IconButton>
        <FormControlLabel value="Chirp" control={<Radio />} label="Chirp" />
        <IconButton onClick={() => playSample("chirp")} aria-label="play-sample-chirp">
          <PlayCircleOutlineIcon />
        </IconButton>
      </RadioGroup>
    </FormControl>
  );
}
