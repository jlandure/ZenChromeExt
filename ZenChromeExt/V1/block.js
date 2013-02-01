var password;

function unblock(e) {
	chrome.browserAction.setIcon({path:"ok.png"});
	document.querySelector('#block').removeEventListener('click', unblock, false);
	document.querySelector('#block').addEventListener('click', block);
	document.querySelector('#block').value = "Block Web Access"; 
	document.querySelector('#block').className = "btn btn-large btn-primary";
	document.querySelector('h2').innerHTML = "Block Web Access";
	chrome.webRequest.onBeforeRequest.removeListener(requestListener);
}


function block(e) {
	if(document.querySelector('#set_password').value == '') {
		alert('Please enter a password...');
		return;
	} 
	if(document.querySelector('#set_password').value == document.querySelector('#confirm_password').value) {
		password = document.querySelector('#set_password').value;
	} else {
		alert('Please type the same password !');
		return;
	}
	chrome.browserAction.setIcon({path:"block.png"});
	document.querySelector('#block').removeEventListener('click', block, false);
	document.querySelector('#block').addEventListener('click', unblock);
	document.querySelector('#block').value = "Stop blocking";
	document.querySelector('#block').className = "btn btn-large btn-danger";
	document.querySelector('h2').innerHTML = "Unlock Web Access";
}

document.addEventListener('DOMContentLoaded', function () {
	document.querySelector('#block').addEventListener('click', block);
});

