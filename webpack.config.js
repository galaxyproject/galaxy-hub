const path = require("path");

module.exports = {
    mode: "development",
    entry: "./src/js/index.js",
    output: {
        path: __dirname + "/build/js",
        publicPath: "/js/",
        filename: "bundle.js"
    },
    resolve: {
        modules: [path.join(__dirname, "src/js"), "node_modules"]
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: "babel-loader",
                options: {
                    cacheDirectory: true,
                    cacheCompression: false,
                    presets: ["@babel/preset-env"]
                }
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)(\?.*$|$)/,
                use: {
                    loader: "file-loader"
                }
            },
            {
                test: require.resolve("jquery"),
                use: [
                    {
                        loader: "expose-loader",
                        options: "$"
                    },
                    {
                        loader: "expose-loader",
                        options: "jQuery"
                    }
                ]
            },
            {
                test: require.resolve("lodash"),
                use: [
                    {
                        loader: "expose-loader",
                        options: "_"
                    }
                ]
            },
            {
                test: require.resolve("axios"),
                use: [
                    {
                        loader: "expose-loader",
                        options: "axios"
                    }
                ]
            },
            {
                test: path.join(__dirname, `src/js/index`),
                use: [
                    {
                        loader: "expose-loader",
                        options: "hubFunctions"
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: "style-loader" // creates style nodes from JS strings
                    },
                    {
                        loader: "css-loader" // translates CSS into CommonJS
                    },
                    {
                        loader: "sass-loader" // compiles Sass to CSS
                    }
                ]
            }
        ]
    }
};
