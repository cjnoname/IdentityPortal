const webpack = require("webpack");
const path=require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require("clean-webpack-plugin")
const HtmlWebpackPlugin=require('html-webpack-plugin');
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const OpenBrowserPlugin = require("open-browser-webpack-plugin");

// *****************************************************************************
// init plugins start
const extractCSS = new ExtractTextPlugin('styles/[name].css');
const cleanPlugin = new CleanWebpackPlugin(['dist'], {
    verbose: true, 
    dry: false
});
const uglifyPlugin = new webpack.optimize.UglifyJsPlugin({
    compress: { warnings: false },
});
const commonChunkPlugin = new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.js' });
const htmlPlugin = new HtmlWebpackPlugin({template:'./src/index.html'})

const optimizeCssPlugin = new OptimizeCssAssetsPlugin({
    assetNameRegExp: /\.css$/,
    cssProcessorOptions: { discardComments: { removeAll: true } }
});

const openBrowserPlungin = new OpenBrowserPlugin({ url: 'http://localhost:8080' });
// *****************************************************************************
// init plugins end

module.exports = {
    entry: {
      app: "./src/index.js",
      vendor: [
            'react',
            'react-dom',
            'redux',
            'react-router',
            'classnames',
            'axios'
        ]
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].js"
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: "babel-loader",
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: extractCSS.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            }
        ]
    },
    plugins: [
        cleanPlugin,
        commonChunkPlugin,
        htmlPlugin,
        extractCSS, 
        optimizeCssPlugin,
        uglifyPlugin,
        openBrowserPlungin
    ],
    devtool: 'source-map',
    // devServer: {
    //   contentBase: helpers.root('client'),
    //   proxy: {
    //     '/api/*': 'http://localhost:64338/Umbraco/Api',
    //     // '/images/*': 'http://localhost:5000',
    //     '/realtime/*': 'http://localhost:64338/Umbraco/Api',
    //     '/proxy/*': 'http://localhost:64338/Umbraco/Api'
    //   }
    // }
}