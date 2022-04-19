import { AppDataSource } from "./data-source"
import {Microservice} from "koa-microservice";
import {Connection} from "typeorm";
import {User} from "./entity/User";

import * as Koa from "koa";
import * as Router from "koa-router";

import * as logger from "koa-logger";
import * as json from "koa-json";
import * as bodyParser from "koa-bodyparser";

let dbConnection : Connection;

const router = new Router();

const app : Koa = new Microservice({
    healthCheckEndpoint: '/health-check'
});

// open database connection
app.onStartup(async()=>{
    AppDataSource.initialize().then(async () => {
        dbConnection = await AppDataSource.manager.connection;
        return dbConnection.isConnected;
    }).catch(error => console.log(error));
});

// close database connection
app.onShutdown(async() => {
    if (dbConnection.isConnected)
        await dbConnection.close();

    return (dbConnection.isConnected ? false : true)
});

// health check
app.addHealthCheck(() => {
    return dbConnection.isConnected;
});


router.get("/", async ctx => {
    ctx.body = "Hola Mundo";
});

router.get("/ping", async ctx => {
    ctx.body = "pong";
});

// Middlewares
app.use(json());
app.use(logger());
app.use(bodyParser());

// Routes
app.use(router.routes()).use(router.allowedMethods());

// HTTP listener
app.http(8080);

// start
app.start();