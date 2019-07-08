import { Dao } from './dao/Dao'
import { App } from './App'
import { Server } from './Server'
import { RouterRegistry } from './Router'
import { Service } from './services/Service'
import { AppMiddleware } from './AppMiddleware'

const PORT = Number(process.env.PORT || 8080)

const main = async () => {
  const dao = await Dao.init()

  const routerFactory = new RouterRegistry()

  const appRouter = routerFactory.build('App')
  const appServices: Service[] = []
  const appMiddleware = new AppMiddleware(dao.user.validateUser)

  const app = new App(appRouter, appMiddleware, appServices)

  const server = new Server()

  await server.start(app, PORT)

  console.log(`Now listening on port ${PORT}`)
}

main()
