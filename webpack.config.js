let path = require("path");

module.exports = {
    mode: "production",
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
                use: {
                    loader: "babel-loader",
                    options: { presets: ["env"] }
                }
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)(\?.*$|$)/,
                use: {
                    loader: "file-loader"
                }
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
