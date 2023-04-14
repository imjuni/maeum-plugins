/* eslint-disable @typescript-eslint/naming-convention */
import 'fastify';

declare module 'fastify' {
  export interface FastifyRequest {
    $isLogged: boolean;
    $error: WeakRef<Error>;
    $payload: WeakRef<{ payload: unknown }>;

    setRequestLogging: () => void;
    getRequestLogging: () => boolean;

    setRequestError: (error: Error) => void;
    getRequestError: () => Error;

    setRequestPayload: (payload: unknown) => void;
    getRequestPayload: () => unknown;
  }
}
