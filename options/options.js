function notification_status_change(){
	var val = document.getElementById('enable_notifs').checked;

	chrome.storage.local.set({'com.8tracks.enable_notifs': val}, function() {
	});
}

(function() {
	
	var notif_settings_key = 'com.8tracks.enable_notifs';

	chrome.storage.local.get(notif_settings_key, function(items) {
		if(items[notif_settings_key] == true)
		{
			document.getElementById('enable_notifs').checked = true;
		}
		else
		{
			document.getElementById('enable_notifs').checked = false;
		}
	});

	document.getElementById('enable_notifs').addEventListener("change",notification_status_change);

})();