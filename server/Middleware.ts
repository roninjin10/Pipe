import session from "express-session";
import morgan from "morgan";
import passport, { PassportStatic } from "passport";
import { Strategy } from "passport-local";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";

export type VerifyLogin = (
  username: string,
  password: string
) => Promise<boolean>;

class VerifyLoginStrategy extends Strategy {
  constructor(verifyLogin: VerifyLogin) {
    super(async (username, password, done) => {
      try {
        const user = await verifyLogin(username, password);
        done(null, user);
      } catch (e) {
        done(null, false, e);
      }
    });
  }
}

class Passport {
  constructor(
    strategy: Strategy,
    private readonly localPassport: PassportStatic = passport
  ) {
    this.localPassport.serializeUser((user, done) => done(null, user));
    this.localPassport.deserializeUser((user, done) => done(null, user));
    this.localPassport.use(strategy);
  }

  public readonly initialize = () => this.localPassport.initialize();
  public readonly session = () => this.localPassport.session();
}

export class PipeMiddleware extends Array {
  constructor(isLoginValid: VerifyLogin) {
    super();

    const strategy = new VerifyLoginStrategy(isLoginValid);

    const localPassport = new Passport(strategy);

    this.push(
      this.cors(),
      this.bodyParser.json(),
      this.bodyParser.urlencoded({ extended: false }),
      this.morgan,
      this.cookieParser(),
      this.session,
      localPassport.initialize(),
      localPassport.session()
    );
  }

  private readonly cookieParser = cookieParser;
  private readonly cors = cors;
  private readonly bodyParser = bodyParser;
  private readonly morgan = morgan((tokens, req, res) =>
    [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      JSON.stringify(req.body),
      "\n",
      tokens.res(req, res, "content-length"),
      "-",
      tokens["response-time"](req, res),
      "ms"
    ].join(" ")
  );
  private readonly session = session({
    secret: "good luck figuring out this secret ",
    resave: true,
    saveUninitialized: true,
    cookie: {
      secure: false,
      httpOnly: false
    }
  });
}
