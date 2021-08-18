import { RequestHandler } from 'express';

/**
 * Wraps an async function handler
 * @param fn
 * @return
 */
export function wrapAsync<P, ResBody, ReqBody, ReqQuery, Locals>(
  fn: (...args: Parameters<RequestHandler<P, ResBody, ReqBody, ReqQuery, Locals>>) => Promise<void>
): RequestHandler<P, ResBody, ReqBody, ReqQuery, Locals> {
  return (req, res, next) => void fn(req, res, next).catch(next);
}
