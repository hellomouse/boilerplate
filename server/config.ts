// @ts-check
import { URL } from 'url';
const env = process.env;

/**
 * Define a required configuration parameter
 * @param name Configuration value name
 * @param mapFn Value map function
 * @return
 */
function required<T>(name: string, mapFn: (a: string) => T): T {
  let value = env[name];
  if (typeof value === 'undefined') {
    throw new Error(`required value ${name} not provided`);
  }
  return mapFn(value);
}

export const BASE_URL = required('BASE_URL', url => new URL(url));
export const API_BASE_URL = required('API_BASE_URL', url => new URL(url));
export const PORT = required('PORT', port => +port);
