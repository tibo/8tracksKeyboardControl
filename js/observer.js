var player_box = document.getElementById('player_box');

var title = undefined;
var artist = undefined;

var observer = new WebKitMutationObserver(function(mutations, observer) {
	var now_playing = document.getElementById('now_playing');

	if (now_playing.hasChildNodes())
	{
		var t = now_playing.getElementsByClassName('t')[0].innerText;
		var a = now_playing.getElementsByClassName('a')[0].innerText;

		if (t && a)
		{
			if (t != title || a != artist)
			{
				title = t;
				artist = a;

				var mix_player_details = document.getElementById('mix_player_details');
				var cover_url = mix_player_details.getElementsByTagName('img')[0].src;
				var index_of_parameters = cover_url.indexOf("&w=");
				var cover_url = cover_url.substr(0, index_of_parameters);

				chrome.runtime.sendMessage({message: "new_track", data: {title: title, artist: artist, img: cover_url}});
			}
		}

		
	}
});

observer.observe(player_box, {
	subtree: true,
	attributes: true,
	characterData: true
});