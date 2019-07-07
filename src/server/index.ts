import { Dao } from './dao/Dao'
import express, { Router as expressRouterFactory } from 'express'
import { App } from './App'
import { Server } from './Server'
import { Router } from './services/Router'
import { Service } from './services/Service'
import { AppMiddleware } from './AppMiddleware'

const PORT = Number(process.env.PORT || 8080)

const main = async () => {
  const dao = await Dao.init()

  const appRouter = new Router('App', expressRouterFactory())
  const appServices: Service[] = []
  const appMiddleware = new AppMiddleware(dao.user.validateUser)

  const app = new App(appRouter, appMiddleware, appServices)

  const server = new Server(express())

  await server.start(app, PORT)

  console.log(`Now listening on port ${PORT}`)
}

main()
