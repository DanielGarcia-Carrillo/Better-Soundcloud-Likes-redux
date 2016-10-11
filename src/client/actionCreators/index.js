// @flow

export function streamSong(songId: Number) {
    return (dispatch: Function) => {
        return SC.stream('/tracks/' + songId)
            .then(player =>
                dispatch({
                    type: 'STREAM_SUCCEEDED',
                    id: songId,
                    player
                })
            );
    };
}
