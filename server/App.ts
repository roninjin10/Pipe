import { Express, Router, RequestHandler } from "express";

export class PipeApp {
  constructor(
    private readonly server: Express,
    router: Router,
    middleware: RequestHandler[]
  ) {
    this.useMiddleware(router, ...middleware);
  }

  public readonly listen = (port: number) =>
    new Promise(resolve => this.server.listen(port, resolve));

  private useMiddleware = (...middleware: RequestHandler[]) =>
    middleware.forEach(m => this.server.use(m));
}
