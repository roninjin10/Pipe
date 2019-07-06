import webpack from 'webpack'
import { webpackConfig } from '../webpack'

webpack(webpackConfig).run((err, stats) => {
  if (err) {
    throw err
  }
  console.log('build successful', stats.toString({ colors: true }))
})
