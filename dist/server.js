/// <reference path="../typings/index.d.ts" />
"use strict";
var express = require("express");
var path = require("path");
var Server = (function () {
    // Start the configuration
    function Server() {
        this.app = express();
        this.app.use("/", express.static(path.resolve(__dirname, "views")));
        this.app.use("/lib", express.static(path.resolve(__dirname, "lib")));
        this.app.get("/Hello", function (req, res) {
            res.send("Hallo World!");
        });
        this.app.listen(process.env.PORT || 3000, function () {
            console.log("Example app is listing!");
        });
    }
    // initialize the Server, which calls the constructor see below
    Server.init = function () {
        return new Server();
    };
    return Server;
}());
Server.init();
