var webpack = require("webpack");

module.exports = {
    entry: {
        app: ["./app/js/main.js"]
    },
    output: {
        path: __dirname,
        filename: "dist/bundle.js",
        publicPath: "/dist/"
    },
    devtool: "source-map",
    module: {
        preLoaders: [
            {
                test: /\.js?$/,
                loader: "eslint-loader",
                exclude: /(node_modules|bower_components)/
            }
        ],
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: "babel",
                query: {
                    presets: ["es2015", "stage-0", "react"],
                    plugins: [__dirname + "/plugins/babelRelayPlugin"]
                }
            }, {
                test: /\.scss$/,
                loaders: ["style", "css", "sass"]
            }
        ]
    },
    plugins: [new webpack.HotModuleReplacementPlugin()]
};
