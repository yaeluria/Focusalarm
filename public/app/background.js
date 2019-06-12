// focusmate session url example: https://www.focusmate.com/launch/44169c1a-5efc-4289-b3f0-80406b02aa9d

/*global chrome*/

const played = {};
const urlCache = {};

function handleTimeChange(tabId, changeInfo, tabInfo) {
    const tabUrl = tabInfo.url;


    if (typeof urlCache[tabUrl] === 'boolean' && urlCache[tabUrl] === false) {
        return;
    } else if (urlCache[tabUrl] === undefined) {
        tabUrl.includes("https://www.focusmate.com/launch/") || tabUrl.includes("http://theinsomniacsociety.com/timer.html") ? urlCache[tabUrl] = true : urlCache[tabUrl] = false;
    }


    chrome.storage.sync.get(['sound', 'time'], function (result) {

        const chosenSound = result.sound;
        const chosenTime = result.time || "1 minutes";

        const linkForChoice = (choice) => ({
            'Bell': 'https://res.cloudinary.com/drvycak8r/video/upload/v1557737548/storage/30161__herbertboland__belltinystrike.wav',
            'Chirp': 'https://res.cloudinary.com/drvycak8r/video/upload/v1557737433/storage/85403__readeonly__canaryartie-3.wav',
            'T.rex roar': 'https://interactive-examples.mdn.mozilla.net/media/examples/t-rex-roar.mp3'
        })[choice]

        const soundLink = linkForChoice(chosenSound);

        const audio = new Audio(soundLink);

        const timeLeftChoice = parseInt(chosenTime, 10);
        const title = changeInfo.title;


      


        const splitTitle = title.split(' ');
        const playAudio = () => {
            audio.play();
            console.log("should play audio")
            played[tabId] = true;
        }


        if (!played[tabId]) {
            //  insomnia timer (test) code
            if (tabUrl.includes("http://theinsomniacsociety.com/timer.html")) {
              
            const splitInsomnia = title.split(":");
                
            const insomniaPlay = (index) => {
                if ((splitInsomnia[index]) < timeLeftChoice) {
                    playAudio();
                }
            }
            const checkMinutes = () => {
                if(splitInsomnia[0] === '00') {
                    insomniaPlay(1)
                }  
            }
        
            (chosenTime.split(" ")[1]) === "minutes" ? insomniaPlay(0) :  checkMinutes();
    

            }
            else {
                const minutes = (t) => parseInt((t.split(' ')[2]), 10);
                const seconds = (t) => parseInt((t.split(' ')[3]), 10);
         
                const validTitle = (splitTitle.length === 4) && (splitTitle[0] === "Ends");
               
                const conditionsMinutes = minutes(title) < timeLeftChoice;
                const conditionsSeconds =  ((minutes(title) === 0) && (seconds(title) < timeLeftChoice));

             const Play = (conditions) => {
                if((title === "Session Completed") || (validTitle && (conditions))){
                    playAudio();
                }
             } 


            chosenTime.split(" ")[1] === "minutes" ? Play(conditionsMinutes) : Play(conditionsSeconds);
               
               
            }

        }

    })
}


chrome.tabs.onUpdated.addListener(handleTimeChange);


