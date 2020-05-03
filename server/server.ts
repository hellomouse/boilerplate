// @ts-check
require('dotenv').config();
import { promises as fsP } from 'fs';
import http from 'http';
import https from 'https';
import app from './app';
import log from './logger';
import { PORT } from './config';
const env = process.env;

/** Main function */
async function main() {
  /** @type {http.Server | https.Server} */
  let server;
  if (env.TLS === 'true') {
    if (!env.TLS_CERT || !env.TLS_KEY) throw new Error('no tls key or cert specified');
    server = https.createServer({
      cert: await fsP.readFile(env.TLS_CERT),
      key: await fsP.readFile(env.TLS_KEY)
    }, app);
  } else server = http.createServer(app);
  server.listen(PORT).on('listening', () => log.info('Listening'));
}
main();
