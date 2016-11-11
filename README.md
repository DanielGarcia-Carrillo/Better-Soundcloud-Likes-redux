# Better-Soundcloud-Likes-redux
A port of my better soundcloud to react/redux

Currently deployed to [google storage](https://storage.googleapis.com/better-soundcloud-callback.appspot.com/index.html) (no server is used to make implementation simple)

## Testing
If you don't have a soundcloud account then you can access by adding `?dev=1` to the url (It pulls a json object with my personal likes)

Safari blocks popups and therefore the Soundcloud oauth flow, so dev mode must be used

## TODO
* Not all likes are shown
* Ditch Souncloud.stream sdk call because it makes an unnecessary API call for track info
* Detect when song ends to update UI and play next song (if applicable)
