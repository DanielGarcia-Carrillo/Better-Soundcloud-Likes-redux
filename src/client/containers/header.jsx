//@ flow
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

const Header = React.createClass({
    propTypes: {
        onSearch: PropTypes.func,
        onNext: PropTypes.func,
        onPlayPause: PropTypes.func,
        onPrevious: PropTypes.func,
        songPlaying: PropTypes.bool
    },

    handleKeyUp(e) {
        this.props.onSearch(e.target.value);
    },

    render() {
        return (
            <div className="header">
                <div className="player-controls">
                    <i className="fa fa-lg fa-step-backward" onClick={this.props.onPrevious}/>
                    <i
                        className={`fa fa-lg ${this.props.songPlaying ? 'fa-pause' : 'fa-play'}`}
                        onClick={this.props.onPlayPause}
                    />
                    <i className="fa fa-lg fa-step-forward" onClick={this.props.onNext}/>
                </div>
                <input
                    type="text"
                    placeholder="Search favorites"
                    onKeyUp={this.handleKeyUp}
                />
            </div>
        );
    }
});

function mapStateToProps(state) {
    return {
        songPlaying: state.activeSongPlaying
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onSearch: query => dispatch({
            type: 'SEARCH_REQUESTED',
            query
        }),
        onPrevious: () => dispatch({
            type: 'PREVIOUS_SONG_REQUESTED'
        }),
        onPlayPause: () => dispatch({
            type: 'PLAY_PAUSE_REQUESTED'
        }),
        onNext: () => dispatch({
            type: 'NEXT_SONG_REQUESTED'
        })
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Header);
