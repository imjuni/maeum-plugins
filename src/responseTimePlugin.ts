import type { FastifyInstance } from 'fastify';
import fastifyPlugin from 'fastify-plugin';

const responseTimePlugin = fastifyPlugin(
  function responseTimeHandle(
    fastify: FastifyInstance,
    options: {
      headerKey?: string;
    },
    done: (err?: Error) => void,
  ) {
    const headerKey = options.headerKey ?? 'X-Response-Time';

    fastify.addHook('onSend', (_req, reply, _data, hookDone) => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      reply.header(headerKey, reply.getResponseTime());
      hookDone();
    });

    done();
  },
  {
    fastify: '4.x',
    name: 'maeum-response-time',
  },
);

export default responseTimePlugin;
