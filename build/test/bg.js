var msgPort;
console.log("background");
function connected(prt) {
    msgPort = prt;
    //console.log(msgPort);
    msgPort.onDisconnect.addListener((p) => {
      console.log(p);
      if (p.error) {
        console.log(`Disconnected due to an error: ${p.error.message}`);
      }
    });
}


chrome.runtime.onConnect.addListener(connected);
