var storage = browser.storage.local;




//Wallet class
var Wallet = function (currency, address) {
	this.currency = currency;
	this.address = address;
	var balance=0;
//0x3af9fe35d280ada5a5edb1bef3ed872a3231d73c
	this.add = function () {

		var walletData = {{[this.currency]:[this.address]:[balance]}};
		//console.log(JSON.parse(walletData.[this.currency,this.address, balance]));
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


async function handleMessage(request) {
	//console.log(request);
	var action = request.action;
	var currency = request.currency;
	var address = request.address;
	var wallet = new Wallet(currency, address);

	//console.log(wallet);
	switch(action) {
		case "lst":
			const retrievedWallets = storage.get("wallets");
			retrievedWallets.then((res) => {
				 //console.log(res);
				 const { tslReminders: reminders = {} } = res;
				browser.runtime.sendMessage(res.wallets);

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
