var player_box = document.getElementById('player_box');

var title = undefined;
var artist = undefined;

var observer = new WebKitMutationObserver(function(mutations, observer) {
	// console.log("mutations: ", mutations, observer);

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

				var cover_url = document.getElementById('cover_art').src;

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