import Settlement from "./components/Settlement.js";
import createSettlement from "./components/Settlement.js";

function init() {
  let settlement = createSettlement();
  settlement.process();
  settlement.render();
  settlement.renderWiki();

  console.log(settlement);


}

init();