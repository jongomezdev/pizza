var plugins = [{
      plugin: require('C:/Users/Jonathan Gomez/Desktop/pizza/gatsby/node_modules/gatsby-plugin-react-helmet/gatsby-ssr'),
      options: {"plugins":[]},
    },{
      plugin: require('C:/Users/Jonathan Gomez/Desktop/pizza/gatsby/node_modules/gatsby-plugin-styled-components/gatsby-ssr'),
      options: {"plugins":[]},
    },{
      plugin: require('C:/Users/Jonathan Gomez/Desktop/pizza/gatsby/node_modules/gatsby-source-sanity/gatsby-ssr'),
      options: {"plugins":[],"projectId":"9fcg9sr4","dataset":"production","watchMode":true,"token":"skPbqy7PQl3bHQ4cmUM2uCUGw089telCYy22qjA8XOrY4S3PTWNZ8RJPpGF0N0MkYEzEX3P7DXCzNkmaCI0D05sMebQNiZqQsjIKZA3vDGirTjSxKNXBCkoO5ZJ49NppCfsLO8D76i67BDhz9EKELjJBxNgMej2w9SB136iLU0Td0JCpbqti"},
    },{
      plugin: require('C:/Users/Jonathan Gomez/Desktop/pizza/gatsby/gatsby-ssr'),
      options: {"plugins":[]},
    }]
// During bootstrap, we write requires at top of this file which looks like:
// var plugins = [
//   {
//     plugin: require("/path/to/plugin1/gatsby-ssr.js"),
//     options: { ... },
//   },
//   {
//     plugin: require("/path/to/plugin2/gatsby-ssr.js"),
//     options: { ... },
//   },
// ]

const apis = require(`./api-ssr-docs`)

// Run the specified API in any plugins that have implemented it
module.exports = (api, args, defaultReturn, argTransform) => {
  if (!apis[api]) {
    console.log(`This API doesn't exist`, api)
  }

  // Run each plugin in series.
  // eslint-disable-next-line no-undef
  let results = plugins.map(plugin => {
    if (!plugin.plugin[api]) {
      return undefined
    }
    const result = plugin.plugin[api](args, plugin.options)
    if (result && argTransform) {
      args = argTransform({ args, result })
    }
    return result
  })

  // Filter out undefined results.
  results = results.filter(result => typeof result !== `undefined`)

  if (results.length > 0) {
    return results
  } else {
    return [defaultReturn]
  }
}
