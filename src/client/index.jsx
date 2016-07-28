// @flow
import React from 'react';
import {render} from 'react-dom';

const App = React.createClass({
    render() {
        return <p>Hello React!</p>;
    }
});

render(<App/>, document.getElementById('app'));
