// @ts-nocheck

import { NextApiRequest, NextApiResponse } from 'next';
import { randomUUID } from 'crypto';
import http from 'http';

const RemoteServerFactory = require('@salesforce/pwa-kit-runtime/ssr/server/build-remote-server').RemoteServerFactory;
const defaultPwaKitSecurityHeaders = require('@salesforce/pwa-kit-runtime/utils/middleware').defaultPwaKitSecurityHeaders;
const getConfig = require('@salesforce/pwa-kit-runtime/utils/ssr-config').getConfig;
const helmet = require('helmet');

const makeErrorHandler = (proc, server, log) => {
  return (e) => {
    if (e.code === 'EADDRINUSE') {
      log(`This port is already being used by another process.`)
      // server.close()
      // proc.exit(2)
    }
  }
}

const ProxyServerMixin = {
  _setupProxying(app, _) {
    const proxyConfigs = require('@salesforce/pwa-kit-runtime/utils/ssr-shared').proxyConfigs;
    proxyConfigs.forEach((config) => {
      app.use(config.proxyPath, config.proxy);
      app.use(config.cachingPath, config.cachingProxy);
    });
  },

  // _setRequestId(app) {
  //   app.use((req, res, next) => {
  //     res.locals.requestId = randomUUID()
  //     next()
  //   })
  // },

  // /**
  //  * @private
  //  */
  // _getDevServerHostAndPort(options) {
  //   const split = options.devServerHostName.split(':')
  //   const hostname = split.length === 2 ? split[0] : options.devServerHostName
  //   const port = split.length === 2 ? split[1] : options.port
  //   return {hostname, port}
  // },
  //
  // _createHandler(app) {
  //   const {hostname, port} = this._getDevServerHostAndPort(app.options)
  //
  //   let server
  //
  //   server = http.createServer(app)
  //
  //   server.on('error', makeErrorHandler(process, server, console.log))
  //
  //   server.on('close', () => app.applicationCache.close())
  //
  //   // server.listen({hostname, port}, () => {
  //   //
  //   // })
  //
  //   const handler = (...args) => {
  //     console.log('@#@#@#@#@#@#@#', args, args.length, args[1]);
  //   }
  //
  //   return {handler: handler, server, app}
  // },
};

const options = {
  // The contents of the config file for the current environment
  mobify: getConfig(),

  // The protocol on which the development Express app listens.
  // Note that http://localhost is treated as a secure context for development,
  // except by Safari.
  protocol: 'http'
};

const getRuntime = () => {
  const runtime = Object.assign({}, RemoteServerFactory, ProxyServerMixin);

  // The runtime is a JavaScript object.
  // Sometimes the runtime APIs are invoked directly as express middlewares.
  // In order to make sure the "this" keyword always have the correct context,
  // we bind every single method to have the context of the object itself
  const boundRuntime = { ...runtime };
  for (const property of Object.keys(boundRuntime)) {
    if (typeof boundRuntime[property] === 'function') {
      boundRuntime[property] = boundRuntime[property].bind(boundRuntime);
    }
  }

  return boundRuntime;
};

const runtime = getRuntime();

const { handler } = runtime.createHandler(options, app => {
  // Set default HTTP security headers required by PWA Kit
  app.use(defaultPwaKitSecurityHeaders);
  // Set custom HTTP security headers
  app.use(
    helmet({
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'img-src': [
            // Default source for product images - replace with your CDN
            '*.commercecloud.salesforce.com'
          ],
          'script-src': [
            // Used by the service worker in /worker/main.js
            'storage.googleapis.com'
          ],
          'connect-src': [
            // Connect to Einstein APIs
            'api.cquotient.com'
          ]
        }
      }
    })
  );
});

console.log(handler)

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    const data = handler(req, res);
    console.log('GET', { data });
    return Response.json({ message: 'Something went wrong!', data });
  } catch (e) {
    console.error(e);
    return Response.json({ message: 'Something went wrong!', e });
  }
}

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const data = handler(req, res);
    console.log({ data });
    return Response.json({ message: 'Something went wrong!', data });
  } catch (e) {
    console.error(e);
    return Response.json({ message: 'Something went wrong!', e });
  }
}

export async function DELETE(req: NextApiRequest, res: NextApiResponse) {
  try {
    const data = handler(req, res);
    console.log({ data });
    return Response.json({ message: 'Something went wrong!', data });
  } catch (e) {
    console.error(e);
    return Response.json({ message: 'Something went wrong!', e });
  }
}

export async function PUT(req: NextApiRequest, res: NextApiResponse) {
  try {
    const data = handler(req, res);
    console.log({ data });
    return Response.json({ message: 'Something went wrong!', data });
  } catch (e) {
    console.error(e);
    return Response.json({ message: 'Something went wrong!', e });
  }
}
