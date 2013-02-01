var password;

function unblock(e) {
	chrome.browserAction.setIcon({path:"ok.png"});
	document.querySelector('#block').removeEventListener('click', unblock, false);
	document.querySelector('#block').addEventListener('click', blockWithGrant);
	document.querySelector('#block').value = "Block Web Access"; 
	document.querySelector('#block').className = "btn btn-large btn-primary";
	document.querySelector('h2').innerHTML = "Block Web Access";
	chrome.webRequest.onBeforeRequest.removeListener(requestListener);
}

function needToBlock(details) {
	if(details.url.indexOf("google.fr") != -1 
			|| details.url.indexOf("chrome-extension://") == 0) {
		return false;
	}
	return true;
}

function requestListener(details) {
	return {cancel: needToBlock(details)};
}
function block(e) {
	blocking = true;
	chrome.browserAction.setIcon({path:"block.png"});
	chrome.webRequest.onBeforeRequest.addListener(requestListener,
			{urls: ["<all_urls>"]},
			["blocking"]);
	document.querySelector('#block').removeEventListener('click', blockWithGrant, false);
	document.querySelector('#block').addEventListener('click', unblock);
	document.querySelector('#block').value = "Stop blocking";
	document.querySelector('#block').className = "btn btn-large btn-danger";
	document.querySelector('h2').innerHTML = "Unlock Web Access";
}

function blockWithGrant(e) {
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
	chrome.permissions.request({
		permissions: ['webRequest',
		              'webRequestBlocking']
	}, function(granted) {
		// The callback argument will be true if the user granted the permissions.
		if (granted) {
			block();
		} else {
			alert('Unable to launch this extension without granted permissions');
		}
	});

}

document.addEventListener('DOMContentLoaded', function () {
		document.querySelector('#block').addEventListener('click', blockWithGrant);
});