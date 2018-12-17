import { createApp } from './main'

export default context => {
  // since there could potentially be asynchronous route hooks or components,
  // we will be returning a Promise so that the server can wait until
  // everything is ready before rendering.
  return new Promise((resolve, reject) => {
    const { app, router, store } = createApp()

    // set server-side router's location
    router.push(context.url)

    // wait until router has resolved possible async components and hooks
    router.onReady(() => {

      const matchedComponents = router.getMatchedComponents()

      // no matched routes, reject with 404
      if (!matchedComponents.length) {
        return reject({ code: 404 })
      }

      // call `asyncData()` on all matched route components
      Promise.all(matchedComponents.map(component => {
        // asyncData() is only for Page Layout
        if (component.asyncData) {
          return component.asyncData({
            store,
            route: router.currentRoute
          })
        }
      })).then((res) => {
        // After all preFetch hooks are resolved, our store is now
        // filled with the state needed to render the app.
        // When we attach the state to the context, and the `template` option
        // is used for the renderer, the state will automatically be
        // serialized and injected into the HTML as `window.__INITIAL_STATE__`.
        context.state = store.state
        // const page = res.shift()
        // if (page) {
        //   context.title = page.title
        //   context.description = page.description
        //   context.keywords = page.keywords
        // }
        resolve(app)
      }).catch(reject)
    }, reject)
  })
}
