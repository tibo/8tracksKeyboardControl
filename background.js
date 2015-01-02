
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
		if (eightTracksTab != undefined)
		{
			if (eightTracksTab.id == tabId)
			{
				set8TracksTab();
			}
		}
	});

	set8TracksTab();
})();