// @flow
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import {createStore, applyMiddleware} from 'redux';
import todoApp from './reducers';
import App from './components/app.jsx';
import {fetchFavorites} from './soundcloud';

fetchFavorites()
    .then(function(likes) {
        const songs = Object.create(null);
        const orderedSongs = [];

        likes.forEach(like => {
            // Certain songs aren't available on the streaming api
            if (!like.streamable) {
                return;
            }

            songs[like.id] = {
                artist: like.user.username,
                coverArt: like.artwork_url,
                date: (new Date(like.created_at)).getTime(),
                id: like.id,
                permalink: like.permalink_url,
                title: like.title
            };

            orderedSongs.push(like.id);
        });

        const store = createStore(todoApp, {
                songsById: songs,
                orderedSongs,
                activeSongId: null,
                activeSongPlaying: false,
                scPlayer: null
            },
            applyMiddleware(thunkMiddleware)
        );

        render(
          <Provider store={store}>
            <App />
          </Provider>,
          document.getElementById('app')
        );
    })
    .catch(function() {
        debugger;
    });
