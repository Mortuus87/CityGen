import Settlement from "./components/Settlement.js";
import createSettlement from "./components/Settlement.js";
import renderOptions from "./components/interactiveRender.js";

function init() {
  document.querySelector('.interactive').innerHTML = renderOptions();

  let settlement = createSettlement();
  settlement.process();
  settlement.render();
  settlement.renderWiki();

  console.log(settlement);
}

init();