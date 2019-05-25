// focusmate session url example: https://www.focusmate.com/launch/44169c1a-5efc-4289-b3f0-80406b02aa9d

/*global chrome*/

//put callback inside eventlistenr
//or- put callback function inside handletimechange (play inside callback function)

let played= {};

function handleTimeChange(tabId, changeInfo, tabInfo) {

        chrome.storage.sync.get(['sound', 'time'], function(result) {

       
            const chosenSound = result.sound;
            const chosenTime = result.time || "59 seconds";
         
            const linkForChoice = (choice) => ({
                 'Bell' : 'https://res.cloudinary.com/drvycak8r/video/upload/v1557737548/storage/30161__herbertboland__belltinystrike.wav',
                 'Chirp': 'https://res.cloudinary.com/drvycak8r/video/upload/v1557737433/storage/85403__readeonly__canaryartie-3.wav',
                 'T.rex roar' : 'https://interactive-examples.mdn.mozilla.net/media/examples/t-rex-roar.mp3'
                })[choice]
                
            const soundLink = linkForChoice(chosenSound);
                
            const audio = new Audio(soundLink); 
            //  console.log("change info:")
            //  console.log("|"+ changeInfo.title + "|");
            console.log(chosenTime);
            const timeLeftChoice = parseInt(chosenTime, 10);
            console.log(timeLeftChoice);
            const title = changeInfo.title;
     
     
           const seconds = (t) => parseInt((t.split(' ')[3]),10);
           const minutes = (t) => parseInt((t.split(' ')[2]),10);
           
           console.log (seconds(title));
           console.log (minutes(title));
           
     
            const splitTitle = title.split(' ');
            //const timeLeftString = splitTitle[3]
           // const timeLeft = parseInt(timeLeftString, 10);
          //  console.log(timeLeft);
            
     
         //    if (((splitTitle[2] === "0m") && (timeLeft <= timeLeftChoice))|| (title === "Session Completed")){
         //        audio.play();
         //        return;
         //    }
         
            if (((!played[tabId]) &&
             ((title === "Session Completed")
             || ((splitTitle.length === 4) && (minutes(title) === 0) && (seconds(title) <= timeLeftChoice))))){
             audio.play();
             console.log("should play audio")
             played[tabId] = true;
             
            }
            
            if (title === "59:50"){
                audio.play();
                console.log("should play audio")
            }
     
          
         //     if (changeInfo.title === "Ends In 0m 23s"|| changeInfo.title === "Ends In 0m 22s" || changeInfo.title === "Ends In 0m 21s" || changeInfo.title === "59:50" || changeInfo.title === "59:49" || changeInfo.title === "59:48") {
         //         console.log('should play audio');
         //         console.log(chosenSound);
         //         console.log(soundLink);
         //         audio.play()
            
         //    }
         
          }); 
         
        
         

 
    
  
}







chrome.tabs.onUpdated.addListener(handleTimeChange);
