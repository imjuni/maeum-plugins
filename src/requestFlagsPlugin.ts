import type { FastifyInstance } from 'fastify';
import fastifyPlugin, { type PluginMetadata } from 'fastify-plugin';

declare module 'fastify' {
  interface FastifyRequest {
    $isLogged?: boolean | undefined;
    $error?: Error | undefined;
    $payload?: unknown | undefined;

    setRequestLogging: () => void;
    getRequestLogging: () => boolean;

    setRequestError: (error: Error) => void;
    getRequestError: () => Error | undefined;

    setRequestPayload: (payload: unknown) => void;
    getRequestPayload: () => unknown | undefined;
  }
}

const requestFlagsPlugin = fastifyPlugin(
  function errorFlag(
    fastify: FastifyInstance,
    _options: PluginMetadata,
    done: (err?: Error) => void,
  ) {
    fastify.decorateRequest('setRequestError', function setRequestError(error: Error) {
      // this.$error = new WeakRef<Error>(error);
      this.$error = error;
    });

    fastify.decorateRequest('getRequestError', function getRequestError(): Error | undefined {
      return this.$error;
    });

    fastify.decorateRequest('setRequestPayload', function setRequestPayload(payload: unknown) {
      this.$payload = payload;
    });

    fastify.decorateRequest('getRequestPayload', function getRequestPayload(): unknown | undefined {
      // return this.$payload?.deref()?.payload;
      return this.$payload;
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
    name: 'maeum-request-flag',
  },
);

export default requestFlagsPlugin;
