module.exports = {
    entry: {
        'dist/bundle': './src/client/index.jsx',
        'dist/test': './test/test.js'
    },
    output: {
        path: './',
        filename: '[name].js'
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            loader: 'babel'
        }, {
            test: /\.css$/,
            loader: 'style!css'
        }]
    }
};
