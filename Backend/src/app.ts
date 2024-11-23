import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import ProductRouter from "./router/ProductRouter";
import AuthenticationRouter from "./router/AuthenticationRouter";
import BasketRouter from './router/BasketRouter';
import cors from 'cors';
import cookieParser from 'cookie-parser';

class Server {
    private app;
    constructor() {
        this.app = express();
        this.app.use(bodyParser.json());
        this.app.use(cors({
            origin: "http://localhost:5173",
            methods: ["GET", "POST", "DELETE", "PATCH"],
            allowedHeaders: ["Content-Type", "Authorization"],
            credentials: true,
        }));
        this.app.use(cookieParser());
    }
    public setup(): void {
        dotenv.config();
        const port = process.env.PORT;
        this.app.listen(port, () => {
            console.log("Serveur lancée sur le port : ", port);
        });
        this.setRoute();
    }

    public setRoute(): void {
        this.app.use("/api", ProductRouter);
        this.app.use("/api", BasketRouter);
        this.app.use("/authentication", AuthenticationRouter);
    }
}

const serveur = new Server();
serveur.setup();
