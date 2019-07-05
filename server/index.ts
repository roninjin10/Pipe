import express, { Router } from "express";
import { PipeRouter } from "./Router";
import { PipeApp } from "./App";
import { PipeMiddleware, VerifyLogin } from "./middleware";
import { PipeController } from "./Controller";

const PORT = Number(process.env.PORT || 8080);

// TODO make a real function that uses db
const isLoginValid: VerifyLogin = async (username, password) => true;

const startApp = async () => {
  const server = express();

  const middleware = new PipeMiddleware(isLoginValid);

  const controller = new PipeController();

  const router = new PipeRouter(controller).getRouter();

  const app = new PipeApp(server, router, middleware);

  await app.listen(PORT);

  console.log(`Now listening on port ${PORT}`);
};

startApp();
