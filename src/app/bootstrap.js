const browserFunc = require( './config/browserFunc' );
const Automation = require( './Automation' );

const logger = require( './config/logger' );

const initialStrap = require( './initialStrap' );

async function bootstrap( name ) {
// Initializaing
  const browser = await browserFunc();
  const pages = await browser.pages();
  const page = pages[ 0 ];  

  // Initializaing values
  await page.setDefaultTimeout( 7500 );
  await page.setDefaultNavigationTimeout( 30000 );
  await page.setViewport( { width: 1200, height: 900 } );

  logger.info( '-- bootstrapped --' );
  const a = new Automation( page, name );

  const initialResult = await initialStrap( a, name );
  return a;
};

module.exports = bootstrap;
