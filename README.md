8TracksMediaKeys
================

Just a simple Chrome extension to map the media keys of a keyboard to the 8tracks web player and display track change as Chrome notifications.

Just tested on a Mac keyboard for now.

## Features

- [x] Play/Pause key mapping
- [x] Next key mapping
- [x] Track change as Chrome notification
- [x] Play the first suggested playlist or launch the playlist if the player is hidden

## How to install

The extension is not available on the Chrome store for now. You need to install it manually :

* Clone the repository or download the source here https://github.com/tibo/8TracksMediaKeys/archive/master.zip and unzip it
* Go to your Chrome Settings
* Go the Extensions section, make sure to enable the Developer mode and click on Load unpacked extension
* And finally select the folder you've just unzipped earlier and you should see the extension at the top of you extension list

At this point it should find itself if you have a tab open on 8tracks and observe for new tabs.
You just need to launch a playlist manually first (to make the player appear).

## Known issues

* ~~May have some issues with the notifications caused by the the player update at the end of a playlist and/or the switch between two playlist.~~
* May loose focus of media key if an other music/player app is launched (observed with iTunes, Spotify, VLC...). At this point this is about the concurency in the managment of the keys by the OS and there is not much we can do from a Chrome extension.
