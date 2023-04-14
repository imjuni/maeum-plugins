import type { FastifyInstance } from 'fastify';
import fastifyPlugin from 'fastify-plugin';

const responseTimePlugin = fastifyPlugin(
  function responseTimeHandle(
    fastify: FastifyInstance,
    options: {
      headerKey?: string;
      includeTime?: () => boolean;
    },
    pluginDone: (err?: Error) => void,
  ) {
    const headerKey = options.headerKey ?? 'X-Response-Time';

    fastify.addHook('onSend', (_req, reply, data, done) => {
      if (options.includeTime?.() === true) {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        reply.header(headerKey, reply.getResponseTime());
      }

      done(null, data);
    });

    pluginDone();
  },
  {
    fastify: '4.x',
    name: 'maeum-response-time',
  },
);

export default responseTimePlugin;
