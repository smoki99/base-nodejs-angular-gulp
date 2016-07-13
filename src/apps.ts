/// <reference path="../typings/index.d.ts" />

"use strict";

import * as express from "express";

class Server {
    public app: express.Application;

    // initialize the Server, which calls the constructor see below
    public static init(): Server {
        return new Server();
    }

    // Start the configuration
    constructor() {
        this.app = express();
        this.app.get("'/",  (req, res) => {
            res.send("Hallo World!");
        });

        this.app.listen(process.env.PORT || 3000, () => {
            console.log("Example app is listing!");
        });

    }

}
Server.init();
