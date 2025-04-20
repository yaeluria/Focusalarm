/*global chrome*/
chrome.runtime.onMessage.addListener((message) => {
  if (message.type === "PLAY_SOUND") {
    const audio = new Audio(chrome.runtime.getURL(`${message.sound}.mp3`));
    audio.play().catch(console.error);
  }
});
