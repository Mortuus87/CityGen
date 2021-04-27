import Settlement from "./components/Settlement.js";
import createSettlement from "./components/Settlement.js";
import drawInterface from "./components/interface.js";

function init() {
  document.querySelector('.interactive').innerHTML = drawInterface();

  let settlement = createSettlement();
  settlement.process();


  settlement.render();
  settlement.renderWiki();

  console.log(settlement);
}

init();