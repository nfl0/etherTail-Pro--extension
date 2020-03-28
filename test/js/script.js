//Event handling
var walletInput=document.getElementById("new-wallet"); //Add a new wallet.
var addButton=document.getElementById("add"); //add button
var walletsHolder=document.getElementById("wallets"); //ul of #wallets



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

//Wallet class
var Wallet = function (address, currency) {
  this.address = address;
  this.currency = currency;
	var balance=0;

	this.add = function () {
    //console.log(this.currency+" : "+this.address);
		var walletData = {[this.currency] : this.address};
		localStorage.setItem("wallets", JSON.stringify(walletData));
		var retrievedObject = localStorage.getItem("wallets");
		console.log('retrievedObject: ', JSON.parse(retrievedObject));
		console.log("wallet added.");
  };

  this.refresh = function () {
    console.log("wallet refreshed.");
  };
  this.delete = function () {
    console.log("wallet deleted.");
  };
};

//simulate local storage
async function storage(request){
	//console.log(request);
	var action = request.action;
	var currency = request.currency;
	var address = request.address;
	var wallet = new Wallet(address, currency);

	//console.log(wallet);
	switch(action) {
  case "ref":
    wallet.refresh();
    break;
  case "add":
		wallet.add();
    break;
	case "del":
	  wallet.delete();
	   break;
}

}

//validate input
function validate(walletAddress){
	const currency=["BTC", "ETH", "BCH", "DASH", "DOGE", "LTC", "NEO", "ZEC", ""];

	if(walletAddress){
		for(var i=0; i<8; i++){
			if(WAValidator.validate(walletAddress, currency[i])){
				return {action : "add", address : walletAddress, currency : currency[i]};
		  }
		}
		console.log("Address incorrect or Not supported!");
	}
}

var addWallet=async function(){
	console.log("Adding Wallet...");
	var data = validate(walletInput.value);
	if(data){
		storage(data);
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

		var data = {action : "del", address : walletAddress};
		storage(data);
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
