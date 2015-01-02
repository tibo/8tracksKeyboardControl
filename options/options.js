function notification_status_change(){
	var val = document.getElementById('enable_notifs').checked;
	
	chrome.storage.local.set({enable_notifs: val}, function() {
	});
}

(function() {

	var key = 'enable_notifs';

	chrome.storage.local.get(key, function(items) {
		if(items[key] == true)
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