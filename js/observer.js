var player_box = document.getElementById('player_box');

var now_playing_observer = new WebKitMutationObserver(function(mutations, observer) {
	var now_playing = document.getElementById('now_playing');

	if (mutations[0].target.className == 'track now_playing open')
	{

		var t = now_playing.getElementsByClassName('t')[0].innerText;
		var a = now_playing.getElementsByClassName('a')[0].innerText;
		var mix_player_details = document.getElementById('mix_player_details');
		var cover_url = mix_player_details.getElementsByTagName('img')[0].src;
		var index_of_parameters = cover_url.indexOf("&w=");
		var cover_url = cover_url.substr(0, index_of_parameters);

		chrome.runtime.sendMessage({message: "com.8tracks.new_track", data: {title: t, artist: a, img: cover_url}});		
	}
});

var player_box_observer = new WebKitMutationObserver(function(mutations, observer) {
	var now_playing = document.getElementById('now_playing');

	if (now_playing)
	{
		now_playing_observer.observe(now_playing, {
			subtree: true,
			attributes: true,
			characterData: true
		});

		observer.disconnect();
	}
});



player_box_observer.observe(player_box, {
	subtree: true,
	attributes: true,
	characterData: true
});