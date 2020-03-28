async function handleMessage(request, sender, sendResponse) {
	console.log(request);
}

chrome.runtime.onMessage.addListener(handleMessage);
