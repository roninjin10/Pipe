import { Router as ExpressRouter, Router } from "express";
import { PipeController } from "./Controller";

export class PipeRouter {
  public readonly getRouter = () => this.router;
  constructor(
    public readonly controller: PipeController,
    private readonly router = ExpressRouter()
  ) {}
}
