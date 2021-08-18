const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const DotEnv = require('dotenv-webpack');

module.exports = {
	mode: 'production',
	entry: './src/index.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'index.[contenthash].bundle.js',
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
					filename: 'images/[hash][ext][query]',
				},
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/i,
				type: 'asset/resource',
				generator: {
					filename: 'fonts/[hash][ext][query]',
				},
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			inject: 'body',
			template: './public/index.html',
			filename: './index.html',
		}),
		new MiniCssExtractPlugin({
			filename: './[name].[contenthash].css',
		}),
		new DotEnv(),
	],
	optimization: {
		minimize: true,
	},
};
