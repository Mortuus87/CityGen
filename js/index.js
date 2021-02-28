import createSettlement from "./components/Settlement.js";

function init() {
  let settlement = createSettlement();
  settlement.process();
  settlement.render();

  console.log(settlement);


}

init();