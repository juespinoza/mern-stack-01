const path = require('path');
const webpack = require('webpack');

module.exports = {
	entry: './client/index.js',
	output: {
		path: path.resolve('./client'), //resolver el path de salida
		filename: 'bundle.js' // archivo js compilado
	},
	module: {
		rules: [{
			test: /.jsx?$/,
			loader: 'babel-loader',
			exclude: /node_modules/,
			query: {
				presets: ['env', 'react']
			}
		},
		{
			test: /\.css$/,
			loader: "style-loader!css-loader"
		}]
	}
}