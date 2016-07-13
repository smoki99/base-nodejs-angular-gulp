/// <reference path="../typings/index.d.ts" />

"use strict";

import * as express from "express";
import * as path from "path";

class Server {
    public app: express.Application;

    // initialize the Server, which calls the constructor see below
    public static init(): Server {
        return new Server();
    }

    // Start the configuration
    constructor() {
        this.app = express();

        this.app.use("/", express.static(path.resolve(__dirname, "views")));
        this.app.use("/lib", express.static(path.resolve(__dirname, "lib")));

        this.app.get("/Hello",  (req, res) => {
            res.send("Hallo World!");
        });

        this.app.listen(process.env.PORT || 3000, () => {
            console.log("Example app is listing!");
        });

    }

}
Server.init();
