// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')

// see https://github.com/gsoft-inc/craco/blob/master/packages/craco/README.md#configuration-overview

module.exports = {
  babel: {
    plugins: [
      '@babel/plugin-proposal-nullish-coalescing-operator',
      [
        '@simbathesailor/babel-plugin-use-what-changed',
        {
          active: process.env.NODE_ENV === 'development' // boolean
        }
      ]
    ]
  },
  webpack: {
    plugins: [],
    alias: {
      '@src': path.resolve(__dirname, 'src')
    },
    // https://webpack.js.org/configuration
    configure: webpackConfig => ({
      ...webpackConfig,
      resolve: {
        ...webpackConfig.resolve,
        modules: [...webpackConfig.resolve.modules]
      }
    })
  }
}
