import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import logger from "./logger.js";
import compression from "compression";
import helmet from "helmet";

module.exports = app => {
	
    app.set("port", 3000);
    app.set("json spaces", 4);

    app.use(bodyParser.json());
    app.use((req, res, next) => {
        delete req.body.id;
        next();
    });
    app.use(morgan("common", {
        stream: {
            write: (message) => {
                logger.info(message);
            }
        }
    }));
    app.use(helmet());
    app.use(compression());
    app.use(app.auth.initialize());
    app.use(express.static("public"));
    app.use(cors({
        origin: ["http://localhost:3001"],
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowHeaders: ["Content-Type", "Authorization"]
    }));
};
