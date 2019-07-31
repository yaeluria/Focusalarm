// focusmate session url example: https://www.focusmate.com/launch/44169c1a-5efc-4289-b3f0-80406b02aa9d

/*global chrome*/

const played = {};
const playedForAll = {};
const urlCache = {};

function handleTimeChange(tabId, changeInfo, tabInfo) {
    const tabUrl = tabInfo.url;


    if (typeof urlCache[tabUrl] === 'boolean' && urlCache[tabUrl] === false) {
        return;
    } else if (urlCache[tabUrl] === undefined) {
        tabUrl.includes("https://www.focusmate.com/launch/") || tabUrl.includes("http://theinsomniacsociety.com/timer.html") ? urlCache[tabUrl] = true : urlCache[tabUrl] = false;
    }


    chrome.storage.sync.get(null, function (result) {
     
        const chosenTimes = [];
        
        for (let k in result) {
            if (result[k][0] === true) {
                const chosenTimeOption = result[k][1];
                chosenTimes.push(chosenTimeOption);
            }
        }

        const chosenSound = result.sound;

        const linkForChoice = (choice) => ({
            'Bell': 'https://res.cloudinary.com/drvycak8r/video/upload/v1557737548/storage/30161__herbertboland__belltinystrike.wav',
            'Chirp': 'https://res.cloudinary.com/drvycak8r/video/upload/v1557737433/storage/85403__readeonly__canaryartie-3.wav',
            'T.rex roar': 'https://interactive-examples.mdn.mozilla.net/media/examples/t-rex-roar.mp3'
        })[choice]

        const soundLink = linkForChoice(chosenSound);

        const audio = new Audio(soundLink);

        let timeLeftChoice;
       
        const title = changeInfo.title || "Title";
        const splitTitle = title.split(' ');
       
        const playAudio = (alarm) => {
            audio.play();
            console.log("should play audio")
            playedForAll[alarm] = true;
        }
        


        if (!played[tabId]) {
            //  insomnia timer (test) code
            if (tabUrl.includes("http://theinsomniacsociety.com/timer.html")) {
              
            const splitInsomnia = title.split(":");
                
            const insomniaPlay = (index, a) => {
                if ((splitInsomnia[index]) < timeLeftChoice) {
                    playAudio(a);
                }
            }
            const checkMinutes = (a) => {
                if(splitInsomnia[0] === '00') {
                    insomniaPlay(1,a)
                }  
            }
           
        //  for(let chosenTime of chosenTimes){
        //         timeLeftChoice = parseInt(chosenTime, 10);
        //         if(!playedForAll[chosenTime]){
        //             (chosenTime.split(" ")[1]) === "minutes" ? insomniaPlay(0,chosenTime) :  checkMinutes(chosenTime);
        //         }
        
           
        //  if ((Object.keys(playedForAll).length) === (chosenTimes.length)){
        //     played[tabId] = true;
        //  }
         
         //what if user adds another alarm after all alarms have played?

                }
                
            }
           
            
            else {
                const minutes = (t) => parseInt((t.split(' ')[2]), 10);
                const seconds = (t) => parseInt((t.split(' ')[3]), 10);
         
                const validTitle = (splitTitle.length === 4) && (splitTitle[0] === "Ends");
               
                const conditionsMinutes = minutes(title) < timeLeftChoice;
                const conditionsSeconds =  ((minutes(title) === 0) && (seconds(title) < timeLeftChoice));

             const Play = (conditions, a) => {
                if((title === "Session Completed") || (validTitle && (conditions))){
                    playAudio();
                }
             } 
             for(let chosenTime of chosenTimes){
                timeLeftChoice = parseInt(chosenTime, 10);
                chosenTime.split(" ")[1] === "minutes" ? Play(conditionsMinutes, chosenTime) : Play(conditionsSeconds, chosenTime);
    
             }
               
            }

        }

    })
}


chrome.tabs.onUpdated.addListener(handleTimeChange);


