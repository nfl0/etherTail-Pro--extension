var storage = browser.storage.local;

/*
function init(){
	let walletData;
	let balance = [0,0,0,0,0,0,0,0];
	for(let i=0; i<8; i++){
		let walletData={[symbol[i]]:[wallet_sample[i], balance[i]]};
		console.log(walletData);
	}
}
init();
*/
//Wallet class
var Wallet = function (currency, address) {
	this.currency = currency;
	this.address = address;
	var balance=0;
//0x3af9fe35d280ada5a5edb1bef3ed872a3231d73c
	this.add = function () {

		var walletData = {[this.currency]:[this.address, balance]};
		let stringify= JSON.stringify(walletData);
		console.log(stringify);
		storage.set({
						["wallets"]: walletData
					});

  };

  this.refresh = function () {
    console.log("wallet refreshed.");
  };
  this.delete = function () {
		console.log("data: ", this.currency);
    console.log("wallet deleted.");
  };
};


async function handleMessage(request, sender) {
	console.log(request);
	var action = request.action;
	var currency = request.currency;
	var address = request.address;
	var wallet = new Wallet(currency, address);

	//console.log(wallet);
	switch(action) {
		case "lst":
			const retrievedWallets = storage.get("wallets");
			retrievedWallets.then((res) => {
				 const { tslReminders: reminders = {} } = res;
				browser.runtime.sendMessage(res);

			});
			//wallet.list();
			break;
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


chrome.runtime.onMessage.addListener(handleMessage);
