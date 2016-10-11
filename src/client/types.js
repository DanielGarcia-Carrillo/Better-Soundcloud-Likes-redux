import {PropTypes} from 'react';

export const SongType = PropTypes.shape({
    id: PropTypes.number,
    artist: PropTypes.string,
    coverArt: PropTypes.string,
    date: PropTypes.number,
    permalink: PropTypes.string,
    title: PropTypes.string
});
