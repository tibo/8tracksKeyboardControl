
var eightTracksTab = undefined;


function set8TracksTab(){
	chrome.tabs.query({'url':'*://8tracks.com/*'}, function(tabs) {
		if(tabs.length > 0)
		{
			eightTracksTab = tabs[0];
			observeTab(eightTracksTab);

			if(tabs.length > 1)
			{
				console.log("You have more than one tab open on 8tracks.");
			}
		}
		else
		{
			eightTracksTab = undefined;
		}
	});
}

function observeTab(tab){
	chrome.tabs.executeScript(tab.id, {
        file: 'js/observer.js'
	});
}

(function() {
	chrome.commands.onCommand.addListener(function(command) {
		if (eightTracksTab)
		{
			if (command == 'next')
			{
				chrome.tabs.executeScript(eightTracksTab.id, {code : "document.getElementById('player_skip_button').click();"});
			}
			else if (command == 'pause')
			{
				chrome.tabs.executeScript(eightTracksTab.id, {code : "document.getElementById('player_pause_button').style.display"}, function(results){
					if (results[0] == 'none')
					{
						chrome.tabs.executeScript(eightTracksTab.id, {code : "document.getElementById('player_play_button').click();"});
					}
					else
					{
						chrome.tabs.executeScript(eightTracksTab.id, {code : "document.getElementById('player_pause_button').click();"});
					}
				});
			}
		}
	});

	chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
		if (changeInfo['status'] == 'complete')
		{
			if (tab.url.indexOf("8tracks.com") > -1)
			{
				set8TracksTab();
			}
		}
	});

	chrome.tabs.onRemoved.addListener(function(tabId, removeInfo) {
		if (eightTracksTab)
		{
			if (eightTracksTab.id == tabId)
			{
				set8TracksTab();
			}
		}
	});

	chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
		var notif_settings_key = 'enable_notifs';
	
		chrome.storage.local.get(notif_settings_key, function(items) {
			if(items[notif_settings_key] == true)
			{
				if (message['message'] && message['message'] == 'new_track')
				{
					var data = message['data'];

					var notification = {
						type: 'basic',
						title: '8tracks',
						message: data['title'] + ' by ' + data['artist'],
						iconUrl: '/img/icon128.png',
						appIconMaskUrl: '/img/icon16.png',
						isClickable: true,
						eventTime: (Date.now() + 5000)
					};
					
					if (data['img'])
					{
						notification['iconUrl'] = data['img'];
					}
					
					chrome.notifications.create('', notification, function(notificationId) {
					});
				}
			}
		});
	});

	chrome.notifications.onClicked.addListener(function(notificationId) {
		if (eightTracksTab)
		{
			chrome.windows.update(eightTracksTab.windowId, {focused: true});
			chrome.tabs.update(eightTracksTab.id, {selected: true});
		}
	});

	chrome.runtime.onInstalled.addListener(function(details) {
		chrome.storage.local.set({enable_notifs: true}, function() {
		});
	});

	set8TracksTab();
})();