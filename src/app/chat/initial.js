const createLogger = require( '../config/createLogger' );
const bootstrap = require( '../core/bootstrap' );

async function chatInitial( bootstrapBool = false ) {
  let sel, rootSel, parentSel, combo = '';
  let pause = 1000;
  let timeOut = 5000;
  
  const logger = createLogger( 'solo--chatInitial' );
  logger.info( '-- BEGINNING --' );
  const a = await bootstrap( 'chatInitial', bootstrapBool );

  parentSel = '#chat-window div.chat-container ';
  const chatPopped = await a.visibleCheck( parentSel, timeOut, pause );
  if ( chatPopped ) {
    logger.info( 'chat already popped out' );
    return true;
  };

  await a.page.waitForTimeout( pause );
  // what: visible; chat
  sel = 'div.chat-container';
  const chatOpen = await a.visibleCheck( sel, timeOut, pause );
  if ( !chatOpen ) {
    // what: click; footer chat icon
    sel = '#wc-footer > div > .footer-button__button > .footer-button__img-layer > .footer-button__chat-icon';
    await a.selClick( sel, timeOut, pause );
  };
  
  await a.page.waitForTimeout( pause );
  // what: visible; chat on right side
  parentSel = '#wc-container-right';
  sel = ' div.chat-container';
  combo = parentSel + sel;
  const chatRightSide = await a.visibleCheck( combo, timeOut, pause );
  // If chat isn't popped out, pop it out
  if ( chatRightSide ) {
    // what: click; dropdown menu icon
    sel = '#chatSectionMenu';
    await a.selClick( sel, timeOut, pause );
    // what: click; via finding element by text; pop out option
    // sel = '.chat-header__header > .dropdown > .chat-header__dropdown-menu a';
    // combo = parentSel + sel;
    // await a.findElFromText( combo, 'Pop Out', 'click' );
    // Or manually go to it via keyboard
    await a.page.waitForTimeout( 1000 );
    await a.page.keyboard.press( 'ArrowDown' );
    await a.page.keyboard.press( 'ArrowDown' );
    await a.page.keyboard.press( 'Enter' );
  };
  
  await a.page.waitForTimeout( pause );

  // Chat should be popped out now
  // what: click; the popup just to confirm it is there
  parentSel = '#chat-window div.chat-container ';
  const chatPopped = await a.visibleCheck( parentSel, timeOut, pause );
  if ( !chatPopped ) {
    logger.error( 'chat should be popped out by now' );
    return false;
  };
  
  return true;
};

module.exports = chatInitial;
