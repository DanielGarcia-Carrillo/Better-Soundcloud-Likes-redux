//@ flow
import React, {PropTypes} from 'react';
import {SongType} from '../types';

const Song = React.createClass({
    propTypes: {
        onClick: PropTypes.func,
        isActive: PropTypes.bool,
        isPlaying: PropTypes.bool,
        song: SongType
    },

    render() {
        const {onClick, song} = this.props;

        return (
            <li onClick={onClick} className="song-item">
                <img className="cover-art" src={song.coverArt} />
                <div className="song-details">
                    <div className="song-title">{song.title}</div>
                    <div className="song-artist">{song.artist}</div>
                </div>
            </li>
        );
    }
});

export default Song;
