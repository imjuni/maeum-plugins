/* eslint-disable @typescript-eslint/naming-convention */
import 'fastify';

declare module 'fastify' {
  export interface FastifyRequest {
    $isLogged: boolean | undefined;
    $error: WeakRef<Error | undefined>;
    $payload: WeakRef<{ payload: unknown | undefined }>;

    setRequestLogging: () => void;
    getRequestLogging: () => boolean;

    setRequestError: (error: Error) => void;
    getRequestError: () => Error | undefined;

    setRequestPayload: (payload: unknown) => void;
    getRequestPayload: () => unknown | undefined;
  }
}
