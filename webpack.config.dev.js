const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const DotEnv = require('dotenv-webpack');

module.exports = {
	mode: 'development',
	entry: './src/index.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].js',
		clean: true,
	},
	resolve: {
		extensions: ['.js', '.mjs'],
		alias: {
			'@utils': path.resolve(__dirname, '/src/utils/'),
			'@templates': path.resolve(__dirname, '/src/templates/'),
			'@styles': path.resolve(__dirname, '/src/styles/'),
			'@assets': path.resolve(__dirname, '/src/assets/'),
		},
	},
	module: {
		rules: [
			{
				test: /\.m?js$/,
				exclude: /(node_modules|bower_components)/,
				use: { loader: 'babel-loader' },
			},
			{
				test: /\.s?css$/i,
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				type: 'asset/resource',
				generator: {
					filename: 'images/[name][ext]',
				},
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/i,
				type: 'asset/resource',
				generator: {
					filename: 'fonts/[name][ext]',
				},
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			inject: 'body',
			template: './public/index.html',
			filename: './[name].html',
		}),
		new MiniCssExtractPlugin({
			filename: './[name].css',
		}),
		new DotEnv(),
	],
};
