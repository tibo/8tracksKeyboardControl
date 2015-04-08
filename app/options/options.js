'use strict';

var notifSettingsKey = 'com.8tracks.enable_notifs';

function notificationStatusChange(){
	var val = document.getElementById('enable_notifs').checked;

	var obj = {};
	obj[notifSettingsKey] = val;

	chrome.storage.local.set(obj);
}

(function() {
	chrome.storage.local.get(notifSettingsKey, function(items) {
		if(items[notifSettingsKey] === true)
		{
			document.getElementById('enable_notifs').checked = true;
		}
		else
		{
			document.getElementById('enable_notifs').checked = false;
		}
	});

	document.getElementById('enable_notifs').addEventListener('change',notificationStatusChange);

})();