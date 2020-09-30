// focusmate session url example: https://www.focusmate.com/session/1596316500

/*global chrome*/

const played = {};
const playedForAll = {};
const urlCache = {};

function handleTimeChange(tabId, changeInfo, tabInfo) {  
  const tabUrl = tabInfo.url;
  if (typeof urlCache[tabUrl] === "boolean" && urlCache[tabUrl] === false) {
    return;
  } else if (urlCache[tabUrl] === undefined) {
    if (
      tabUrl.includes("https://www.focusmate.com/session") ||
      tabUrl.includes("https://www.focusmate.com/dashboard") ||
      tabUrl.includes("csb.app")
    ) {
      //the older version of the app had result.time. need to make sure this is cleared from chrome.storage
      chrome.storage.sync.get(null, (result) => {
        console.log("result for time", result);
        if (result.time) {
          chrome.storage.sync.remove(["time"], (result) => {
            console.log(result);
          });
        }
      });

      if (playedForAll) {
        for (const timePlayed of Object.getOwnPropertyNames(playedForAll)) {
          delete playedForAll[timePlayed];
        }
      }
      urlCache[tabUrl] = true;
    } else {
      urlCache[tabUrl] = false;
    }
  }

  const timeOption = (choice) =>
    ({
      fiftyMinutes: "50 minutes",
      tenMinutes: "10 minutes",
      twoMinutes: "2 minutes",
      oneMinute: "1 minutes",
      twentySeconds: "20 seconds",
    }[choice]);

  chrome.storage.sync.get(null, (result) =>{
    let chosenBefore;
    const chosenTimes = [];
    for (let userOption in result) {
      if (result[userOption] === true) {
        if (timeOption(userOption) !== "50 minutes") {
          const chosenTimeOption = timeOption(userOption);
          const chosenTimeNumber = parseInt(chosenTimeOption, 10);
          // if chosenTimeOption is in minutes and an alarm played for seconds
          // if chosenTimeOption is in minutes and an alarm played for minutes that were less than chosenTimeNumber
          // returns true if for example chosen time number is 2 minutes and an alarm that already played was 20 seconds (or any seconds) or 1 minutes.
          const conditionsMins = (alarmThatAlreadyPlayed) =>
            alarmThatAlreadyPlayed.split(" ")[1] === "seconds" ||
            (alarmThatAlreadyPlayed.split(" ")[1] === "minutes" &&
              alarmThatAlreadyPlayed.split(" ")[0] < chosenTimeNumber);

          //if chosenTimeOption is in seconds and an alarm played for seconds that were less than ChosenTimeNumber - not going to happen in current version of app since there is only one seconds option but maybe later on.
          // return true if for example alarm that already played is 30 seconds and chosen time number is 40 seconds
          const conditionsSecs = (alarmThatAlreadyPlayed) =>
            alarmThatAlreadyPlayed.split(" ")[1] === "seconds" &&
            alarmThatAlreadyPlayed.split(" ")[0] < chosenTimeNumber;

          const alarmPassed = (conditions) => {
            for (let timeIndex in playedForAll) {
              if (conditions(timeIndex)) {
                return true;
              }
            }
          };

          const dontAddAlarm =
            //if the chosen time is for minutes run alarmPassed with the minutes conditions, if for seconds with the seconds condition
            chosenTimeOption.split(" ")[1] === "minutes"
              ? alarmPassed(conditionsMins)
              : alarmPassed(conditionsSecs);

          if (dontAddAlarm !== true) {
            chosenTimes.push(chosenTimeOption);
          }
        } else {
          if (!played.before) {
            chosenBefore = true;
          }
        }
      }
    }

    const chosenSound = result.sound;
    const soundLink = `/${chosenSound.toLowerCase()}.mp3`;
    const audio = new Audio(soundLink);

    let timeLeftChoice;

    const title = changeInfo.title || "Title";
    const splitTitle = title.split(" ");
    const minutesSecondsArray = splitTitle[0].split(":");
    const minutes = (t) => parseInt(t[0], 10);
    //will still work if for example 00:05 because of the parseInt()
    const seconds = (t) => parseInt(t[1], 10);

    const validTitle = splitTitle.length === 5;
    const validTitleEnd = validTitle && splitTitle[2] === "end";
    const validTitleStart = validTitle && splitTitle[2] === "start";
    //chosenBefore has a separate function
    // if the user chose a start alarm check if title is "until start"
    if (chosenBefore) {
      if (
        validTitleStart &&
        minutes(minutesSecondsArray) === 0 &&
        seconds(minutesSecondsArray) <= 6
      ) {
        console.log("should play start alarm", title);
        audio.play();
        chosenBefore = false;
        //it will only turn true
        played.before = true;
        //wait 10 seconds and then set played.before to false so if chosenBefore can get set to true once again
        // and the next time the parsed title meets the conditions, if it's not within a
        // 10 second range from the last time the alarm played (a new session could start in 15 minutes)
        // the alarm will play again
        setTimeout(() => (played.before = false), 10000);
      }
    }

    if (!played[tabUrl]) {
      const playAudio = (alarm) => {
        audio.play();
        console.log("should play audio", title, alarm);
        playedForAll[alarm] = true;
      };

      const Play = (conditions, a) => {
        if (
          title === "Finished! - Focusmate" ||
          (validTitleEnd && conditions)
        ) {
          playAudio(a);
        }
      };
      // this goes through each chosen time, if the chosen time is in minutes, for example 2 minutes it checks the title
      // if the title is for example 1:59 until start, it will see that the parsed minute count is smaller than that chosen time
      // and it will play an alarm if it hadn't already played an alarm for that chosen time
      for (let chosenTime of chosenTimes) {
        timeLeftChoice = parseInt(chosenTime, 10);
        const conditionsMinutes = minutes(minutesSecondsArray) < timeLeftChoice;
        const conditionsSeconds =
          minutes(minutesSecondsArray) === 0 &&
          seconds(minutesSecondsArray) < timeLeftChoice;
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
        played[tabUrl] = true;
      }
    }
  });
}

chrome.tabs.onUpdated.addListener(handleTimeChange);
