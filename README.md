# Maeum plugins

![ts](https://flat.badgen.net/badge/Built%20With/TypeScript/blue)
[![Download Status](https://img.shields.io/npm/dw/@maeum/plugins.svg?style=flat-square)](https://npmcharts.com/compare/@maeum/plugins?minimal=true)
[![Github Star](https://img.shields.io/github/stars/maeumjs/maeum-plugins.svg?style=flat-square)](https://github.com/maeumjs/maeum-plugins)
[![Github Issues](https://img.shields.io/github/issues-raw/maeumjs/maeum-plugins.svg?style=flat-square)](https://github.com/imjuni/@maeum/plugins/issues)
[![NPM version](https://img.shields.io/npm/v/@maeum/plugins.svg?style=flat-square)](https://www.npmjs.com/package/@maeum/plugins)
[![License](https://img.shields.io/npm/l/@maeum/plugins.svg?style=flat-square)](https://github.com/imjuni/@maeum/plugins/blob/master/LICENSE)
[![ci](https://github.com/maeumjs/maeum-plugins/actions/workflows/ci.yml/badge.svg?branch=master)](https://github.com/maeumjs/maeum-plugins/actions/workflows/ci.yml)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

Plugins of the a Maeum boilerplate. ResponseTime, Flag variable plugins includes.

## Response-Time Plugin

Response time add on header field.

```ts
import fastify from 'fastify';
import { responseTimePlugin } from '@maeum/plugins';

const server = fastify();

server
  .register(responseTimePlugin, {
    headerKey: 'X-Response-Time',
    isExecute: () => config.server.runMode !== 'production',
  });
```

| Name | Desc. |
| - | - |
| headerKey | header key for add response time. |
| isExecute | function execution result decide what response time value add or not |

## Request flag Plugin

Varity flags add on request.

```ts
import fastify from 'fastify';
import { requestFlagsPlugin } from '@maeum/plugins';

const server = fastify();

server
  .register(requestFlagsPlugin);
```

| function | Desc. |
| - | - |
| setRequestLogging | that indicate what request is logged or not |
| getRequestLogging | get request is logged |
| setRequestError | that store what error of request |
| getRequestError | get error in request |
| setRequestPayload | that store what payload in reply |
| getRequestPayload | get payload in reply |

This function need manual works. For example, getRequestError return error before you have to set error variable using setRequestError.
