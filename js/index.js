import Settlement from "./components/Settlement.js";
import createSettlement from "./components/Settlement.js";
import Gui from "./components/Gui.js";

function init() {
  const gui = document.querySelector('.gui');
  
  let settlement = createSettlement();

  // this one updates the values the object. Re-run after any changing event to recalculate.
  settlement.process();
  
  gui.innerHTML = Gui().draw(settlement);
  Gui().fill(settlement);

  
  // settlement.render();
  // settlement.renderWiki();

  console.log(settlement);
}

init();