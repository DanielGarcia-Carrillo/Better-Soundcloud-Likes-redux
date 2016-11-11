// @flow
import React, {PropTypes} from 'react';
import Header from '../containers/header.jsx';
import SongList from '../containers/song_list.jsx';
import Player from '../containers/player.jsx';

const App = React.createClass({
    render() {
        return (
            <div>
                <Header />
                <SongList />
                <Player />
            </div>
        );
    }
});

export default App;
