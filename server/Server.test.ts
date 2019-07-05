import express, { Express } from "express";
import { IService, Service } from "./Service";

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

class MockService {
  handler = {};
  getHandler = jest.fn(() => this.handler);
  start = jest.fn();
}

describe("Server", () => {
  let app: MockService;
  const port = 3000;
  let expressServer: Express;
  let server: Server;
  let listenSpy = jest.fn();
  let useSpy = jest.fn();

  beforeEach(() => {
    listenSpy = jest.fn();
    useSpy = jest.fn();

    app = new MockService();
    expressServer = express();
    server = new Server(app as any, port, expressServer);

    expressServer.listen = listenSpy;
  });

  it("Should start app", async () => {
    await server.start();

    expect(app.start.mock.calls.length).toBe(1);
  });

  it("Should pass app handler to / route of express server", async () => {
    await server.start();

    const [firstArg, secondArg] = useSpy.mock.calls[0];

    expect(firstArg).toBe("/");
    expect(secondArg).toBe(app.handler);
  });

  it("Should listen to a specified port", async () => {
    await server.start();
    expect(listenSpy.mock.calls[0][0]).toBe(port);
  });
});
