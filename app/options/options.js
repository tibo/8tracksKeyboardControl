'use strict';

function notificationStatusChange(){
	var val = document.getElementById('enable_notifs').checked;

	chrome.storage.local.set({'com.8tracks.enable_notifs': val});
}

(function() {
	
	var notifSettingsKey = 'com.8tracks.enable_notifs';

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