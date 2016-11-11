import React, {PropTypes} from 'react';
import {streamSong} from '../actionCreators';
import {connect} from 'react-redux';

// This a functional component that renders nothing to fit in with the flux cycle
const Player = React.createClass({
    propTypes: {
        onPlayChange: PropTypes.func.isRequired,
        activeSongId: PropTypes.number,
        activeSongPlaying: PropTypes.bool.isRequired,
        scPlayer: PropTypes.object
    },

    componentWillUpdate(nextProps) {
        const {scPlayer, activeSongId} = this.props;

        if (scPlayer && scPlayer !== nextProps.scPlayer && activeSongId !== nextProps.activeSongId) {
            // cleanup old scPlayer
            scPlayer.pause();
        }
    },

    componentDidUpdate(prevProps) {
        const {activeSongId, activeSongPlaying, scPlayer} = this.props;

        if (scPlayer && prevProps.activeSongId === activeSongId) {
            if (activeSongPlaying) {
                scPlayer.play();
            } else {
                scPlayer.pause();
            }
        }

        if (prevProps.activeSongId !== activeSongId) {
            this.props.onPlayChange(activeSongId);
        }
    },

    render() {
        return null;
    }
});

function mapStateToProps(state) {
    return {
        activeSongId: state.activeSongId,
        activeSongPlaying: state.activeSongPlaying,
        scPlayer: state.scPlayer
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onPlayChange: id => dispatch(streamSong(id))
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Player);
