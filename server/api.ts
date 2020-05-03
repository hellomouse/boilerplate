// @ts-check
import express from 'express';
import log from './logger';

let router = express.Router(); // eslint-disable-line new-cap

/**
 * Wraps an async function handler
 * @param fn
 * @return
 */
function wrap(fn: express.RequestHandler): express.RequestHandler {
  return (req, res, next) => fn(req, res, next).catch(next);
}

router.get('/', wrap(async (req, res) => {
  log.info('a request!');
  res.send('hello, world!');
}));

export default router;
