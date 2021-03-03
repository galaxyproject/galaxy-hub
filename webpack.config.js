const path = require("path");

module.exports = {
    mode: "development",
    entry: "./src/js/index.js",
    output: {
        path: __dirname + "/build/js",
        publicPath: "/js/",
        filename: "bundle.js",
    },
    resolve: {
        modules: [path.join(__dirname, "src/js"), "node_modules"],
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: "babel-loader",
                options: {
                    cacheDirectory: true,
                    cacheCompression: false,
                    presets: ["@babel/preset-env"],
                },
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)(\?.*$|$)/,
                use: {
                    loader: "file-loader",
                },
            },
            {
                test: require.resolve("jquery"),
                use: [
                    {
                        loader: "expose-loader",
                        options: { exposes: ["$", "jQuery"] },
                    },
                ],
            },
            {
                test: require.resolve("lodash"),
                use: [
                    {
                        loader: "expose-loader",
                        options: { exposes: "_" },
                    },
                ],
            },
            {
                test: require.resolve("axios"),
                use: [
                    {
                        loader: "expose-loader",
                        options: { exposes: "axios" },
                    },
                ],
            },
            {
                test: path.join(__dirname, `src/js/index`),
                use: [
                    {
                        loader: "expose-loader",
                        options: { exposes: "hubFunctions" },
                    },
                ],
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: "style-loader", // creates style nodes from JS strings
                    },
                    {
                        loader: "css-loader", // translates CSS into CommonJS
                    },
                    {
                        loader: "sass-loader", // compiles Sass to CSS
                    },
                ],
            },
        ],
    },
};
