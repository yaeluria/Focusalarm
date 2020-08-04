// focusmate session url example: https://www.focusmate.com/session/1596316500

/*global chrome*/

const played = {};
const playedForAll = {};
const urlCache = {};

function handleTimeChange(tabId, changeInfo, tabInfo) {
  const tabUrl = tabInfo.url;
  if
  (typeof urlCache[tabUrl] === "boolean" && urlCache[tabUrl] === false) {
    return;
  }
  else if
  (urlCache[tabUrl] === undefined) {
    if (
      tabUrl.includes("https://www.focusmate.com/session/") ||
      tabUrl.includes("csb.app")
    ) {
      //the older version of the app had result.time. need to make sure this is cleared from chrome.storage
      chrome.storage.sync.get( null,  function (result) {
        if (result.time) {
          chrome.storage.sync.remove(['time'], function(result) {
            console.log(result);
            });
        }
      })

      if (playedForAll !== undefined) {
        for (const timePlayed of Object.getOwnPropertyNames(playedForAll)) {
          delete playedForAll[timePlayed];
        }
      }
      urlCache[tabUrl] = true;
    } else {
      urlCache[tabUrl] = false;
    }
  }

  chrome.storage.sync.get(null, function (result) {
    const chosenTimes = [];
    for (let userOption in result) {
      if (result[userOption][0] === true) {
        const chosenTimeOption = result[userOption][1];
        const chosenTimeNumber = parseInt(chosenTimeOption, 10);

        // if chosenTimeOption is in minutes and an alarm played for seconds
        // if chosenTimeOption is in minutes and an alarm played for minutes that were less than chosenTimeNumber
        // returns true if for example chosen time number is 2 minutes and an alarm that already played was 20 seconds (or any seconds) or 1 minutes.
        const conditionsMins = alarmThatAlreadyPlayed =>
          alarmThatAlreadyPlayed.split(" ")[1] === "seconds" ||
          (alarmThatAlreadyPlayed.split(" ")[1] === "minutes" && alarmThatAlreadyPlayed.split(" ")[0] < chosenTimeNumber);

        //if chosenTimeOption is in seconds and an alarm played for seconds that were less than ChosenTimeNumber - not going to happen in current version of app since there is only one seconds option but maybe later on.
        // return true if for example alarm that already played is 30 seconds and chosen time number is 40 seconds
        const conditionsSecs = alarmThatAlreadyPlayed =>
          alarmThatAlreadyPlayed.split(" ")[1] === "seconds" && alarmThatAlreadyPlayed.split(" ")[0] < chosenTimeNumber;
      
        const alarmPassed = conditions => {
          for (let timeIndex in playedForAll) {
            if (conditions(timeIndex)) {
              return true;
            }
          }
        };

        const dontAddAlarm =
        //if the chosen time is for minutes run alarmPassed with the minutes conditions, if for seconds with the seconds condition
          chosenTimeOption.split(" ")[1] === "minutes"
            ?
             alarmPassed(conditionsMins) 
            : alarmPassed(conditionsSecs);
       
            if (dontAddAlarm !== true) {
          chosenTimes.push(chosenTimeOption);
        }
      }
    }

    const chosenSound = result.sound;

    const linkForChoice = choice =>
      ({
        Bell:
          "https://res.cloudinary.com/drvycak8r/video/upload/v1557737548/storage/30161__herbertboland__belltinystrike.wav",
        Chirp:
          "https://res.cloudinary.com/drvycak8r/video/upload/v1557737433/storage/85403__readeonly__canaryartie-3.wav",
        "T.rex roar":
          "https://interactive-examples.mdn.mozilla.net/media/examples/t-rex-roar.mp3"
      }[choice]);

    const soundLink = linkForChoice(chosenSound);

    const audio = new Audio(soundLink);

    let timeLeftChoice;

    const title = changeInfo.title || "Title";
    const splitTitle = title.split(" ");
    const minutesSecondsArray = splitTitle[0].split(":");

    const playAudio = alarm => {
      audio.play();
      console.log("should play audio", alarm, title);
      playedForAll[alarm] = true;
    };

    if (!played[tabId]) {
      const minutes = t => parseInt(t[0], 10);
      //will still work if for example 00:05 because of the parseInt()
      const seconds = t => parseInt(t[1], 10);
      const validTitle = splitTitle.length === 5 && splitTitle[2] === "end"; //for start alarm ||"start"

      const Play = (conditions, a) => {
        if (title === "Finished! - Focusmate" || (validTitle && conditions)) {
          playAudio(a);
        }
      };
      for (let chosenTime of chosenTimes) {
        timeLeftChoice = parseInt(chosenTime, 10);
        const conditionsMinutes = minutes(minutesSecondsArray) < timeLeftChoice;
        const conditionsSeconds = minutes(minutesSecondsArray) === 0 && seconds(minutesSecondsArray) < timeLeftChoice;
        if (!playedForAll[chosenTime]) {
          chosenTime.split(" ")[1] === "minutes"
            ? Play(conditionsMinutes, chosenTime)
            : Play(conditionsSeconds, chosenTime);
        }
      }

      if (
        Object.keys(playedForAll).length >= chosenTimes.length &&
        title === "Finished! - Focusmate"
      ) {
        played[tabId] = true;
      }
    }
  });
}

chrome.tabs.onUpdated.addListener(handleTimeChange);
