// @flow

// Credit to MDN for this
function escapeRegExp(string: String) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

function getSongId(songIds, activeId, direction) {
    // The search may have changed the current list to not include the active song
    const currentSongIndex = songIds.indexOf(activeId);

    return songIds[Math.min(
        songIds.length - 1,
        Math.max(0, currentSongIndex + direction)
    )];
}

// There aren't many actions in the system so all in one place for now
export default function(state: Object, action: Object): Object {
    const newState = Object.assign({}, state);

    switch (action.type) {
    case 'SEARCH_REQUESTED': {
        const searchRegex = new RegExp('^' + escapeRegExp(action.query || ''), 'i');

        // This won't work for large collections but since I have under 1000 this is Good Enough™
        newState.orderedSongs = Object.keys(state.songsById)
            .map(id => state.songsById[id])
            .filter(song => searchRegex.test(song.title) || searchRegex.test(song.artist))
            .sort(function(a, b) {
                // Descending date order
                return b.date - a.date
            })
            .map(song => song.id);

        return newState
    }
    case 'PREVIOUS_SONG_REQUESTED':
        if (state.activeSongId) {
            newState.activeSongId = getSongId(state.orderedSongs, state.activeSongId, -1)
            newState.activeSongPlaying = true;

            return newState;
        }

        break;
    case 'NEXT_SONG_REQUESTED':
        if (state.activeSongId) {
            newState.activeSongId = getSongId(state.orderedSongs, state.activeSongId, 1)
            newState.activeSongPlaying = true;

            return newState;
        }

        break;
    case 'PLAY_PAUSE_REQUESTED':
        if (!state.activeSongId) {
            // Have the first song play when nothing has been selected
            newState.activeSongId = state.orderedSongs[0];
            newState.activeSongPlaying = true;
        } else {
            newState.activeSongPlaying = !state.activeSongPlaying;
        }

        return newState;
    case 'STREAM_SUCCEEDED':
        if (action.id === state.activeSongId) {
            newState.scPlayer = action.player;
        }

        return newState;
    case 'SONG_SELECTED':
        if (state.activeSongId === action.id) {
            newState.activeSongPlaying = !state.activeSongPlaying;
        } else {
            newState.activeSongId = action.id;
            newState.activeSongPlaying = true;
        }

        return newState;
    }

    return state;
}
