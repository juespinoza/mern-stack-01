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
			options: {
				presets: ['@babel/preset-react', '@babel/preset-env']
				// "presets": [
				// 	"@babel/preset-env",
				// 	"@babel/preset-react"
				// 	],
				// 	"plugins":
				// 	["transform-class-properties", "transform-object-rest-spread",
				// 	 "@babel/plugin-proposal-import-attributes-to-assertions"]
			}
		},
		{
			test: /\.css$/i,
        	use: ['style-loader', 'css-loader']
		}]
	},
	resolve: {
		fallback: { "querystring": require.resolve("querystring-es3") }
	}
}