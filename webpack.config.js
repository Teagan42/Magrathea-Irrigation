"use strict";
var webpack = require("webpack");
let path = require('path');
module.exports = {
    resolve: {
        root: [
            path.resolve('./public/webComponents/'),
        ],
        extensions: [
            ""
            ,".webpack.js"
            ,".web.js"
            ,".js"
            ,".html"
        ]
    },
    entry: {
        //This preloads resources that won't change often
        vendor:['babel-polyfill'
            ,'angular2/core'
            ,'angular2/router'
            ,'angular2/http'
            ,'angular2/platform/browser'
        ],
        components:[
            //  'polymer/polymer.html'
            // ,'paper-card/paper-card.html'
            //,'paper-button/paper-button.html'
            //
            //,'paper-toolbar/paper-toolbar.html'
            //,'iron-icons/places-icons.html'
            //,'iron-icons/iron-icons.html'
            //,'paper-drawer-panel/paper-drawer-panel.html'
            //,'paper-header-panel/paper-header-panel.html'
            //,'paper-item/paper-icon-item.html'
            //,'paper-toggle-button/paper-toggle-button.html'
            //,'paper-spinner/paper-spinner.html'
            //,'paper-dropdown-menu/paper-dropdown-menu.html'
            //,'paper-listbox/paper-listbox.html'
            //,'paper-bottom-sheet/paper-bottom-sheet.html'
            //,'paper-bottom-sheet/paper-bottom-sheet-item.html'
            //,'google-map/google-map.html'
        ],
        //All other resources will be loaded through this entry
        main:'./src/client/main.js',
    },
    output: {
	    path: 'public/',
	    filename: '[name].bundle.js',
    },
    //plugins: [
    //    new webpack.optimize.CommonsChunkPlugin(["vendor","components"], "common.bundle.js")
    //],
    module: {
        loaders: [
            {
                loader: "babel-loader",

                // Skip any files outside of your project's `src` directory
                include: [
                    path.resolve(__dirname, "src/client"),
                ],

                // Only run `.js` files through Babel
                test: /\.js$/,

                // Options to configure babel with
                query: {
                    plugins: [
                        "angular2-annotations",
                        "transform-decorators-legacy",
                        "transform-class-properties",
                        "transform-flow-strip-types"
                    ],
                    presets: ['es2015', "stage-0"],
                }
            },
            {
                test: /\.scss$/,
                loaders: ["style", "css", "sass"],
                include: [
                    path.resolve(__dirname, "public/stylesheets"),
                    path.resolve(__dirname, "public/webComponents"),
                ],
            },
            {
                test: /\.html$/,
                loader: "html"
            },
            {   test: /\.ejs?$/,
                loader: 'ejs-loader'
            }

        ],
    },
};
