import _debug from 'debug'

const debug = _debug('app:server:vimeo-api')

export default async function koaVimeoApiMiddleware (ctx, next) {
  debug('Enable Vimeo API middleware. ' + ctx.originalUrl)
  if (ctx.originalUrl === '/api') {
    console.log('vimeo-api middleware', ctx.originalUrl, ctx.request, ctx.response)
  }
  // if (hasNext) {
  //   await next()
  // }

  // before
  return next().then(() => {
    // after
  })
}
