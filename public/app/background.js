// focusmate session url example: https://www.focusmate.com/launch/44169c1a-5efc-4289-b3f0-80406b02aa9d

/*global chrome*/



const played = {};
let playedForAll = {};
const urlCache = {};

function handleTimeChange(tabId, changeInfo, tabInfo) {
  const tabUrl = tabInfo.url;
  console.log(urlCache[tabUrl]);

  if (typeof urlCache[tabUrl] === "boolean" && urlCache[tabUrl] === false) {
    return;
  } else if (urlCache[tabUrl] === undefined) {
    console.log("urlCache[tabUrl] is undefined");
    //
    if (
     //   tabUrl.includes("https://www.focusmate.com/launch/") ||
        tabUrl.includes("csb.app/")
        ) {
        console.log("playForAll: ");
        console.log(playedForAll);
      if (playedForAll !== undefined) {
        for (const prop of Object.getOwnPropertyNames(playedForAll)) {
          delete playedForAll[prop];
          
        }
          console.log("playedForAll after deletion: ");
          console.log(playedForAll);
      }

      urlCache[tabUrl] = true;
    } else {
      urlCache[tabUrl] = false;
    }
  }

  chrome.storage.sync.get(null, function(result) {
      console.log(result);
    const chosenTimes = [];

    for (let k in result) {
      if (result[k][0] === true) {
        console.log(playedForAll);
        const chosenTimeOption = result[k][1];

        const chosenTimeNumber = parseInt(chosenTimeOption, 10);

        //if chosenTimeOption is in minutes and an alarm played for seconds
        //if chosenTimeOption is in minutes and an alarm played for minutes that were less than chosenTimeNumber
        //if chosenTimeOption is in seconds and an alarm played for seconds that were less than ChosenTimeNumber - not going to happen in current version of app since there is only one seconds option but maybe later on.

        const conditionsMins = a =>
          a.split(" ")[1] === "seconds" ||
          (a.split(" ")[1] === "minutes" && a.split(" ")[0] < chosenTimeNumber);

        const conditionsSecs = a =>
          a.split(" ")[1] === "seconds" && a.split(" ")[0] < chosenTimeNumber;

        const shouldAddAlarm = conditions => {
          for (let k in playedForAll) {
            if (conditions(k)) {
              return true;
            }
          }
        };

        const dontAddAlarm =
          chosenTimeOption.split(" ")[1] === "minutes"
            ? shouldAddAlarm(conditionsMins)
            : shouldAddAlarm(conditionsSecs);
        if (dontAddAlarm !== true) {
            console.log("pushing " + chosenTimeOption);
            chosenTimes.push(chosenTimeOption);
            console.log(chosenTimes);
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

    const playAudio = alarm => {
      audio.play();
      console.log("should play audio");
      playedForAll[alarm] = true;
      console.log(playedForAll);
    };

    if (!played[tabId]) {
      console.log("title:" + title);
      const minutes = t => parseInt(t.split(" ")[2], 10);
      const seconds = t => parseInt(t.split(" ")[3], 10);

      const validTitle = splitTitle.length === 4 && splitTitle[0] === "Ends";

      const Play = (conditions, a) => {
        if (title === "Session Completed" || (validTitle && conditions)) {
          playAudio(a);
        }
      };
      for (let chosenTime of chosenTimes) {
        timeLeftChoice = parseInt(chosenTime, 10);
        const conditionsMinutes = minutes(title) < timeLeftChoice;
        const conditionsSeconds =
          minutes(title) === 0 && seconds(title) < timeLeftChoice;
        if (!playedForAll[chosenTime]) {
          chosenTime.split(" ")[1] === "minutes"
            ? Play(conditionsMinutes, chosenTime)
            : Play(conditionsSeconds, chosenTime);
        }
      }

      if (
        Object.keys(playedForAll).length >= chosenTimes.length &&
        title === "Session Completed"
      ) {
        played[tabId] = true;
      }
    }
  });
}

chrome.tabs.onUpdated.addListener(handleTimeChange);
