const { promises: fsP } = require('fs');

/**
 * You're probably wondering, "Whatever is this branch for, and why is it named
 * 'stupidity-2'?" Well, first things first, the 2 is there because the first
 * attempt failed miserably. And then there's the 'stupidity' part. Surely it
 * can't be that stupid, right? Wrong. I have spent an upwards of 10 hours
 * trying to get nexe to pack this boilerplate into a single executable. But why
 * would I ever do that? Stupidity.
 *
 * What follows is an attempt to write next.js server-side requires into a file
 * that will then have its dependencies resolved and included by nexe. It mostly
 * works.
 *
 * "But how do I use this?"
 * First, ensure that you are sane. Notably, not drunk. Then reconsider packing
 * this in the first place. Do you really need to put your entire next.js app
 * into a single executable? If your answer is "kubernetes", you probably don't.
 * There are better ways to do what you need to do.
 *
 * But anyways,
 * - get nexe, preferably version 4
 * - apply the stupid terser patch I wrote (https://github.com/iczero/nexe/tree/terser)
 *   (optional, but will yield around 25% smaller executables)
 * - do "npm run build" to build the main app (will run this script)
 * - NEXE_DO_MINIFY=true nexe -i nexe/entry.js -r '.next/**' -r .env -o whatever -t linux-x64-12.9.1
 * - to make the executable *even smaller*, consider running upx on the base
 *   nexe executable found in ~/.nexe
 */
async function main() {
  let nextDir = `${__dirname}/../.next`;
  let buildId = (await fsP.readFile(`${nextDir}/BUILD_ID`)).toString();
  let pages = await fsP.readdir(`${nextDir}/server/static/${buildId}/pages`);
  let generatedRequires = '';
  for (let page of pages) {
    if (!page.endsWith('.js')) continue;
    generatedRequires += `require('../.next/server/static/${buildId}/pages/${page}');\n`;
  }
  await fsP.writeFile(`${__dirname}/requires.js`, generatedRequires);
}
main();
