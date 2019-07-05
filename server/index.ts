import { App } from "./App";
import { AppMiddlewares } from "./AppMiddlewares";
import { AppServices } from "./AppServices";
import { Server } from "./Server";
import { Dao } from "./dao/Dao";

const PORT = Number(process.env.PORT || 8080);

const main = async () => {
  const dao = await Dao.init();

  const middlewares = new AppMiddlewares(dao.user);
  const services = new AppServices(dao);

  const app = new App(middlewares, services);

  const server = new Server(app, PORT);

  await server.start();
};

main();
