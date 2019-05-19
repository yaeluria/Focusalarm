// focusmate session url example: https://www.focusmate.com/launch/44169c1a-5efc-4289-b3f0-80406b02aa9d

/*global chrome*/



let chosenSound = chrome.storage.sync.get(['sound'], function(result) {
    return result.sound;
   }); 




const linkForChoice = (choice) => ({
 'Bell' : 'https://interactive-examples.mdn.mozilla.net/media/examples/t-rex-roar.mp3',
 'Chirp': 'https://res.cloudinary.com/drvycak8r/video/upload/v1557737548/storage/30161__herbertboland__belltinystrike.wav',
 'T. rex roar' : 'https://interactive-examples.mdn.mozilla.net/media/examples/t-rex-roar.mp3'
})[choice]

const soundLink = linkForChoice(chosenSound);

const audio = new Audio(soundLink); 

function handleTimeChange(tabId, changeInfo, tabInfo) {
 console.log("change info:")
 console.log("|"+ changeInfo.title + "|");



 if (changeInfo.title === "Ends In 0m 23s"|| changeInfo.title === "Ends In 0m 22s" || changeInfo.title === "Ends In 0m 21s" || changeInfo.title === "59:50" || changeInfo.title === "59:49" || changeInfo.title === "59:48") {
     console.log('should play audio');
     console.log(chosenSound);
     console.log(soundLink);
     audio.play()


}
}






chrome.tabs.onUpdated.addListener(handleTimeChange);
