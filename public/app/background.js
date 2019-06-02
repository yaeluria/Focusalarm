// focusmate session url example: https://www.focusmate.com/launch/44169c1a-5efc-4289-b3f0-80406b02aa9d

/*global chrome*/

//put callback inside eventlistenr
//or- put callback function inside handletimechange (play inside callback function)

let played= {};

function handleTimeChange(tabId, changeInfo, tabInfo) {

        chrome.storage.sync.get(['sound', 'time'], function(result) {

       
            const chosenSound = result.sound;
            const chosenTime = result.time || "1 minutes";
         
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
            console.log(title);
     
           const seconds = (t) => parseInt((t.split(' ')[3]),10);
           const minutes = (t) => parseInt((t.split(' ')[2]),10);
           
           console.log (seconds(title));
           console.log (minutes(title));
           
     
            const splitTitle = title.split(' ');
      
             
        
          
            if ((!played[tabId]) &&
            ((title === "Session Completed") ||
            ((splitTitle.length === 4) && (minutes(title) < timeLeftChoice)))){
                audio.play();
                console.log("should play audio")
                played[tabId] = true;
               }
             

           
          
            //insomnia timer (test) code
            const splitInsomnia = title.split(":");
            console.log(splitInsomnia);  
            if ((!played[tabId]) &&
            ((splitInsomnia[0]) < timeLeftChoice)){
                audio.play();
                console.log("should play audio")
                played[tabId] = true;
               }
     
          }); 
         
        
         

 
    
  
}

 const onUpdatedListener = () => chrome.tabs.onUpdated.addListener(handleTimeChange);



// chrome.webNavigation.onCompleted.addListener(function() { 
//     chrome.tabs.onUpdated.addListener(handleTimeChange);

// }, {url: [{urlMatches : '*://*.focusmate.com/*'}]});

const filter = {
    url:
    [
      {hostContains: ".focusmate"},
    ]
  }

  
  chrome.webNavigation.onCompleted.addListener(onUpdatedListener, filter);
