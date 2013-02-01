function makeBlockUI() {
	document.querySelector('#block').removeEventListener('click', unblock, false);
	document.querySelector('#block').addEventListener('click', block);
	document.querySelector('#block').value = "Start blocking"; 
	document.querySelector('#block').className = "btn btn-large btn-primary";
	document.querySelector('h2').innerHTML = "Block Web Access";
}

function makeUnblockUI() {
	document.querySelector('#block').removeEventListener('click', block, false);
	document.querySelector('#block').addEventListener('click', unblock);
	document.querySelector('#block').value = "Stop blocking";
	document.querySelector('#block').className = "btn btn-large btn-danger";
	document.querySelector('h2').innerHTML = "Unlock Web Access";
}

function unblock(e) {
	if(document.querySelector('#set_password').value == '') {
		alert('Please enter a password...');
		return;
	} 
	if(document.querySelector('#set_password').value != document.querySelector('#confirm_password').value) {
		alert('Please type the same password !');
		return;
	}
	if(document.querySelector('#set_password').value != chrome.extension.getBackgroundPage().password) {
		alert('Identification failed : wrong password !');
		return;
	}
	makeBlockUI();
	chrome.extension.getBackgroundPage().blocking = false;
	chrome.extension.getBackgroundPage().removeListener();
	chrome.extension.getBackgroundPage().updateIcon();
	self.close();
}

function block(e) {
	chrome.permissions.request({
		permissions: ['webRequest',
		              'webRequestBlocking']
	}, function(granted) {
		// The callback argument will be true if the user granted the permissions.
		if (granted) {
			chrome.extension.getBackgroundPage().addListener();
		} else {
			alert('Unable to launch this extension without granted permissions');
		}
		});
	if(document.querySelector('#set_password').value == '') {
		alert('Please enter a password...');
		return;
	} 
	if(document.querySelector('#set_password').value != document.querySelector('#confirm_password').value) {
		alert('Please type the same password !');
		return;
	} else {
		chrome.extension.getBackgroundPage().password = document.querySelector('#set_password').value;
	}
	chrome.extension.getBackgroundPage().blocking = true;
	chrome.extension.getBackgroundPage().updateIcon();
	makeUnblockUI();
	self.close();
}

document.addEventListener('DOMContentLoaded', function () {
		document.querySelector('#block').addEventListener('click', block);
		if(chrome.extension.getBackgroundPage().blocking) {
			makeUnblockUI();
		} else {
			makeBlockUI();
		}
});
