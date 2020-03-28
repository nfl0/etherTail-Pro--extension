const ele = {
	//views
  main: document.getElementById('mainView'),
  edit: document.getElementById('editView'),
	//buttons
  add: document.getElementById('add'),
  set: document.getElementById('set'),
  delete: document.getElementById('delete'),
  cancel: document.getElementById('cancel'),
  refresh: document.getElementById('refresh'),
	//attributes
  hidden: document.getElementById('hidden'),
	//error messages
  error: document.getElementById('error'),
	//text divs
  address: document.getElementById('address'),
  value: document.getElementById('value'),
	//inputs
  newAddress: document.querySelector('[name="newAddress"]'),
}
//var storage = browser.storage.local;

//views
const changePage = view => {
  switch (view) {
    case 'main':
    ele.main.classList.remove('hidden');
		ele.edit.classList.add('hidden');
      break;
    case 'edit':
    ele.edit.classList.remove('hidden');
		ele.main.classList.add('hidden');
      break;
  }
}

//save button and input validation

ele.set.addEventListener('click', ()=> {
	newAddress = ele.newAddress.value;
	//newAddress = "0x3AF9fE35D280ADA5a5edB1BEf3ED872a3231d73C";
	if(WAValidator.validate(newAddress, 'eth')){
    console.log(newAddress);
		changePage("main");
  }
		else
			ele.error.innerHTML = "invalid address";

});

//refresh button

ele.refresh.addEventListener('click', ()=> {

});

//add button

ele.add.addEventListener('click', ()=> {
	changePage("edit");
});

//cancel button

ele.cancel.addEventListener('click', ()=> {
	changePage("main");
});

//change button

ele.delete.addEventListener('click', ()=> {

});

changePage("main");
