import createSettlement from "./components/Settlement.js";

function init() {
  let settlement = createSettlement();
  
  // this one updates the values the object. 
  // Re-run after any changing event to recalculate.
  settlement.process();

  settlement.render();
  settlement.renderWiki();

  console.log(settlement);
}

init();