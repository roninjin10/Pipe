import express from "express";
import { IService } from "./Service";

export class Server {
  constructor(
    private readonly app: IService,
    public readonly port: number,
    private readonly expressServer = express()
  ) {}

  public readonly start = async () => {
    await this.app.start();

    this.expressServer.use("/", this.app.getHandler());

    await new Promise(resolve => this.expressServer.listen(this.port, resolve));

    console.log(
      `${this.app.name} started.  Now listening on port ${this.port}`
    );
  };
}
