//@ flow
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import Song from '../components/song.jsx';
import {SongType} from '../types';

const SongList = React.createClass({
    propTypes: {
        songs: PropTypes.arrayOf(SongType).isRequired,
        activeSongId: PropTypes.number,
        activeSongPlaying: PropTypes.bool,
        onSongSelection: PropTypes.func.isRequired
    },

    render() {
        const {
            songs,
            activeSongId,
            activeSongPlaying,
            onSongSelection
        } = this.props;

        return (
            <ul className="song-list">
                {songs.map(song =>
                    <Song
                        key={song.id}
                        isActive={song.id === activeSongId}
                        isPlaying={song.id === activeSongId && activeSongPlaying}
                        onClick={() => onSongSelection(song.id)}
                        song={song}
                    />
                )}
            </ul>
        );
    }
});

function mapStateToProps(state: Object) {
    return {
        songs: state.orderedSongs.map(songId => state.songsById[songId]),
        activeSongId: state.activeSongId,
        activeSongPlaying: state.activeSongPlaying
    };
}

function mapDispatchToProps(dispatch: Function) {
    return {
        onSongSelection: (id: String) => dispatch({
            type: 'SONG_SELECTED',
            id
        })
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SongList);
