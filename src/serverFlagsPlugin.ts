import type { FastifyInstance } from 'fastify';
import fastifyPlugin, { type PluginMetadata } from 'fastify-plugin';

const serverFlagsPlugin = fastifyPlugin(
  function errorFlag(
    fastify: FastifyInstance,
    _options: PluginMetadata,
    done: (err?: Error) => void,
  ) {
    fastify.decorateRequest('setRequestError', function setRequestError(error: Error) {
      this.$error = new WeakRef<Error>(error);
    });

    fastify.decorateRequest('getRequestError', function getRequestError(): Error | undefined {
      return this.$error.deref();
    });

    fastify.decorateRequest('setRequestPayload', function setRequestPayload(payload: unknown) {
      this.$payload = new WeakRef<{ payload: unknown }>({ payload });
    });

    fastify.decorateRequest('getRequestPayload', function getRequestPayload(): unknown | undefined {
      return this.$payload.deref()?.payload;
    });

    fastify.decorateRequest('setRequestLogging', function setRequestLogging() {
      this.$isLogged = true;
    });

    fastify.decorateRequest('getRequestLogging', function getRequestLogging(): boolean {
      if (this.$isLogged == null) {
        this.$isLogged = true;
        return false;
      }

      return this.$isLogged;
    });

    done();
  },
  {
    fastify: '4.x',
    name: 'maeum-server-flag',
  },
);

export default serverFlagsPlugin;
