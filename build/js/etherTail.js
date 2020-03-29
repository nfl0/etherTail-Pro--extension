//Event handling
var walletInput=document.getElementById("new-wallet"); //Add a new wallet.
var addButton=document.getElementById("add"); //add button
var walletsHolder=document.getElementById("wallets"); //ul of #wallets

var data;

//New Wallet list item
var createNewWalletElement=function(walletString){

	var listItem=document.createElement("li");

	//label
	var label=document.createElement("label"); //label


	//button.delete
	var deleteButton=document.createElement("button"); //delete button

	label.innerText=walletString;

	//Each elements, needs appending

	deleteButton.innerText="Delete";
	deleteButton.className="delete";



	//and appending.
	listItem.appendChild(label);
	listItem.appendChild(deleteButton);
	return listItem;
}


//Send data to bg.js

function sendData(data){
	browser.runtime.sendMessage(data);
}

//validate input
function validate(walletAddress){
	const currency=["BTC", "ETH", "BCH", "DASH", "DOGE", "LTC", "NEO", "ZEC", ""];

	if(walletAddress){
		for(var i=0; i<8; i++){
			if(WAValidator.validate(walletAddress, currency[i])){
				return {action : "add", currency : currency[i], address : walletAddress};
		  }
		}
		console.log("Address incorrect or Not supported!");
	}
}

var addWallet=async function(){
	console.log("Adding Wallet...");
	data = validate(walletInput.value);
	if(data){
		sendData(data);
		//Create a new list item with the text from the #new-wallet:
		var listItem=createNewWalletElement(walletInput.value);

		//Append listItem to walletsHolder
		walletsHolder.appendChild(listItem);
		bindWalletEvents(listItem);
	}

	walletInput.value="";

}

//Delete wallet.
var deleteWallet=function(){
		console.log("Deleting Wallet...");

		var listItem=this.parentNode;
		var ul=listItem.parentNode;
		var walletAddress = listItem.childNodes[0].innerText;

		data = {action : "del", address : walletAddress};
		sendData(data);
		//Remove the parent list item from the ul.
		ul.removeChild(listItem);

}

var ajaxRequest=()=>{
	console.log("AJAX Request");
}

//The glue to hold it all together.


//Set the click handler to the addWallet function.
addButton.onclick=addWallet;
//addButton.addEventListener("click",ajaxRequest);


var bindWalletEvents=function(walletListItem){
//select ListItems children

	var deleteButton=walletListItem.querySelector("button.delete");
			deleteButton.onclick=deleteWallet;
}
//handleMessage from background
function handleMessage(request){
  console.log(Object.keys(request)[0]);
  var listItem=createNewWalletElement(Object.keys(request)[0]);

  //Append listItem to walletsHolder
  walletsHolder.appendChild(listItem);
  bindWalletEvents(listItem);
}

//fetch wallets
function fetchWallets(){
  data = {action : "lst"};
  sendData(data);
}
chrome.runtime.onMessage.addListener(handleMessage);
fetchWallets();
