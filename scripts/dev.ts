import webpack from 'webpack'
import { webpackConfig } from '../webpack'
const WebpackDevServer = require('webpack-dev-server')

const PORT = '8080'

const runWebpack = () =>
  new Promise((resolve, reject) => {
    new WebpackDevServer(webpack(webpackConfig), {}).listen(
      '8080',
      'localhost',
      (err: Error | null) => {
        if (err) {
          return reject(err)
        }

        console.log('webpack-dev-server', `http://localhost:${PORT}/`)

        resolve()
      }
    )
  })

runWebpack()
