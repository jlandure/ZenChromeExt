//Copyright (c) 2011 The Chromium Authors. All rights reserved.
//Use of this source code is governed by a BSD-style license that can be
//found in the LICENSE file.
var blocking = false;
var password;

function addListener() {
	chrome.webRequest.onBeforeRequest.addListener(requestListener,
			{urls: ["<all_urls>"]},
			["blocking"]);
}

function removeListener() {
	chrome.webRequest.onBeforeRequest.removeListener(requestListener);
}

function isValidUrl(details) {
	if(blocking) {
		if(details.url.indexOf("google.fr") != -1) {
			return false;
		}
	}
	if(details.url.indexOf("chrome-extension://") != -1) {
		return false;
	}
	return true;
}

function updateIcon() {
	if(blocking) {
		chrome.browserAction.setIcon({path:"block.png"});
	} else {
		chrome.browserAction.setIcon({path:"ok.png"});
	}
}

function requestListener(details) {
	return {cancel: isValidUrl(details)};
}

chrome.browserAction.setIcon({path:"ok.png"});

