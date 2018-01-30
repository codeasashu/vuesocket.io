var webpack = require('webpack')
var path = require('path')

module.exports = {
	entry: path.resolve('src/index.js'),
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: 'build.js',
		library: ['VueSocketio'],
		libraryTarget: 'umd'

	},
	module: {
		loaders: [{
			test: /\.js$/,
			exclude: /node_modules\/(?!(proxy-polyfill)\/).*/,
			loader: 'babel-loader',
			query: {
				presets: ['env'],
				plugins: ['babel-plugin-transform-es2015-literals'],
			},
		}],
	}
}
