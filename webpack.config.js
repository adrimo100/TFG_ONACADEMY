const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path"); //To get the absolute path
const Dotenv = require('dotenv-webpack'); // Import dotenv-webpack

const ruleForJavaScript = {
    test: /\.js$/, //RegEx all files ended in .js
    loader: "babel-loader",
    options: {
        presets:[
            ["@babel/preset-react", {
                runtime: "automatic" //to not have to manually import react
            }]
        ]//Babel configuration for React
    }
}

const rulesForCSS = {
    test: /\.css$/, //RegEx all files  ended in .css
    use: ["style-loader", "css-loader"] //style loader interpretates the CSS, and css-loader load the static images
}

const rules = [ruleForJavaScript, rulesForCSS]

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "build"),
        publicPath: "/" //default url
    },
    module:{
        rules
    },
    plugins: [
        new HtmlWebpackPlugin({ //Uses template.html and inject the entry script
            template: "template.html",
        }),
        new Dotenv() // Add dotenv-webpack plugin
    ],
    devServer: {
        open: true, //Opens the browser,
        port: 8080,
        allowedHosts: "all",
        historyApiFallback: true, //to be able to use urls in react route
    },
}

