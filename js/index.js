import Settlement from "./components/Settlement.js";
import createSettlement from "./components/Settlement.js";
import Gui from "./components/Gui.js";

function init() {
  const guiElem = document.querySelector('.gui');
  let gui = Gui();
  let settlement = createSettlement();

  // this one updates the values the object. Re-run after any changing event to recalculate.
  settlement.process();
  
  guiElem.innerHTML = gui.draw(settlement);
  gui.fill(settlement);

  
  // settlement.render();
  // settlement.renderWiki();

  console.log(settlement);
}

init();